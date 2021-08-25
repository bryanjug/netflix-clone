import {useEffect, useState} from 'react'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Nav from '../components/Nav'
import FirstVideo from '../components/FirstVideo'
import VideoList from '../components/VideoList'

export default function Home({trending, TVShows, genreList}) {
  console.log(genreList)

  useEffect(() => {
    
  }, [])
  
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (trending !== [] || trending === undefined) {
      setShowLoader(false)
    }
  }, [trending])

  return (
    <div>
      <Meta 
        title="Netflix" 
        description="Watch your favorite TV shows and movies on one platform."
        keywords="Netflix, television, shows, online, watch, new, favorites, movies"
      />
      <main>
        <Nav />
        <FirstVideo />
        <VideoList results={trending.results} title="Trending Now"/>
        <VideoList results={TVShows.results} title="TV Shows"/>
        <Loader showLoader={showLoader}/>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  let resTrending = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.MOVIE_DB_KEY}&adult=false`)
  let trending = await resTrending.json()

  let resTVShows = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.MOVIE_DB_KEY}&adult=false`)
  let TVShows = await resTVShows.json()

  let genres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIE_DB_KEY}&language=en-US`)
  let genreList = await genres.json()

  //18 genres
  // let action = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.MOVIE_DB_KEY}`)
  // let actionList = await genres.json()

  return {
    props: {
      trending,
      TVShows,
      genreList
    }
  }
}
