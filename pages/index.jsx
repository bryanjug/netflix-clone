import React, {useEffect, useState} from 'react'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Nav from '../components/Nav'
import FirstVideo from '../components/FirstVideo'
import VideoList from '../components/VideoList'
import zIndex from '@material-ui/core/styles/zIndex'

// {trendingData, TVShowsData, genreData, firstVideoData, data}
export default function Home() {
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

  function DisplayGenres() {
    let genres = [];

    if (data.genres) {
      let length = Object.keys(data.genres).length;

      let i;
      for (i = 0; i < length; i++) {
        genres.push(<VideoList results={data.genres[i].results} title={data.genres[i].name} key={i} type="movie" />)
      }
    }
    
    return (
      <div>
        {genres}
      </div>
    );
  }
  
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  useEffect(() => {
    function PlaySomething() {
      //result count: 20 in db
      let randomObj = randomIntFromInterval(1, 20) 
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
          title="Netflix" 
          description="Watch your favorite TV shows and movies on one platform."
          keywords="Netflix, television, shows, online, watch, new, favorites, movies"
        />
        
      </head>
      <main>
          <Loader 
            showLoader={showLoader}
          />
          <Nav 
            playSomething={playSomething}
          />
          {
            data.popularMovies ? 
            <FirstVideo firstVideoData={data.popularMovies.results[0]} />
            :
            null
          }
          {
            data.trendingMovies ?
            <VideoList results={data.trendingMovies.results} title="Trending Now" type="movie"/>
            :
            null
          }
          {
            data.popularTVShows ?
            <VideoList results={data.popularTVShows.results} title="TV Shows" type="tv" />
            :
            null
          }
          {
            data.genres ?
            DisplayGenres()
            :
            null
          }
      </main>
    </div>
  )
}
