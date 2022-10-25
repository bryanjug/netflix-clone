import * as React from 'react';
import {useEffect, useState, useMemo} from 'react';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Nav from '../components/Nav'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import styles from './../styles/SearchBar/SearchBar.module.css'
import Autocomplete from '@mui/material/Autocomplete';
import VideoList from '../components/VideoList';
import underline from '/public/underline.png'
import Image from 'next/image'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.55),
  },
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%'
  },
}));

export default function SearchBar() {
    let db = `${process.env.NEXT_PUBLIC_DATABASE}db`;
    let apiKey = process.env.NEXT_PUBLIC_API_TOKEN;
    let apiLink = process.env.NEXT_PUBLIC_MOVIE_DB;
    const [data, setData] = useState([]);
    const [showLoader, setShowLoader] = useState(false)
    const [playSomething, setPlaySomething] = useState([]);
    const [query, setQuery] = useState("");
    const [displayMessage, setDisplayMessage] = useState("");
    const [movies, SetMovies] = useState()
    const [TVShows, setTVShows] = useState()
    const [underlineLength, setUnderlineLength] = useState("40");
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        const GetData = async () => {
          let res = await fetch(db)
          let newRes = await res.json()
          setData(newRes)
          setShowLoader(false)
        }
        GetData()
    }, [])
    
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    useEffect(() => {
        function PlaySomething() {
          //result count: 20 in db
          let randomObj = randomIntFromInterval(0, 19) 
          let id = data.popularMovies.results[randomObj].id;
    
          if (data.popularMovies.results[randomObj].seasons) {
            setPlaySomething(["tv", id])
          } else {
            setPlaySomething(["movie", id])
          }
        }
    
        if (data.popularMovies) {
          PlaySomething();
        }
    }, [data])
    //fetch api
    const SearchData = async (query) => {
        let resMovies = await fetch(apiLink + `search/movie?api_key=${apiKey}&page=1&include_adult=false&query=${query}`)
        let newResMovies = await resMovies.json()
        let resTVShows = await fetch(apiLink + `search/tv?api_key=${apiKey}&page=1&include_adult=false&query=${query}`)
        let newResTVShows = await resTVShows.json()
        
        SetMovies(newResMovies)
        setTVShows(newResTVShows)

    }

    //search and fetch api
    //https://api.themoviedb.org/3/search/movie?api_key=15ef5a4aceb353171df43cbb159d073f&page=1&include_adult=false&query=jef
    useEffect(() => {
        if (query) {
            const timeOutId = setTimeout(() => SearchData(query), 500);
            return () => clearTimeout(timeOutId);
        }
    }, [query]);

    useEffect(() => {
        if (width === 1024) {
            setUnderlineLength("45")
        }
        if (width === 1440) {
            setUnderlineLength("60")
        }
    }, [width])

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
    
  return (
    <div>
        <head>
            <Meta 
                title="Netflix Search" 
                description="Find your favorite TV shows and movies on one platform."
                keywords="Netflix, television, shows, online, watch, new, favorites, movies, search"
            />
        </head>
        <main>
            <Loader showLoader={showLoader} />
            <Nav playSomething={playSomething} />
            <div className={styles.container}>
                <p className={`${styles.sectionTitle} ${styles.firstTitle}`}>Search for something</p>
                <Toolbar className={styles.inputContainer}>
                    <input
                        type="text"
                        value={query}
                        onChange={event => {setQuery(event.target.value)}}
                        className={styles.input}
                        placeholder="Type Something..."
                    />
                </Toolbar>
                {
                    movies && movies.total_results !== 0 ?
                    <div className={styles.titleContainer}>
                        <h4 className={styles.sectionTitle}>Movies</h4>
                        <Image 
                            alt=""
                            src={underline}
                            width={underlineLength}
                            height="4"
                            layout="intrinsic"
                            className={styles.underline}
                        />
                    </div>
                    :
                    null
                }
                {
                    movies ?
                    <VideoList results={movies.results} type="movie"/>
                    :
                    null
                }
                {
                    TVShows && TVShows.total_results !== 0 ?
                    <div className={styles.titleContainer}>
                        <h4 className={styles.sectionTitle}>TV Shows</h4>
                        <Image 
                            alt=""
                            src={underline}
                            width={underlineLength}
                            height="4"
                            layout="intrinsic"
                            className={styles.underline}
                        />
                    </div>
                    :
                    null
                }
                {
                    TVShows ?
                    <VideoList results={TVShows.results} type="tv" className={styles.videosContainer}/>
                    :
                    null
                }
            </div>
        </main>
    </div>
  );
}