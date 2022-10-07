import * as React from 'react';
import {useEffect, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Nav from './../components/Nav'
import Meta from './../components/Meta'
import Loader from '../components/Loader'
import styles from './../styles/SearchBar/SearchBar.module.css'

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
    const [showLoader, setShowLoader] = useState(true)
    const [playSomething, setPlaySomething] = useState([]);

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
            <Toolbar className={styles.container}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </Toolbar>
        </main>
        
    </div>
  );
}