import {useEffect, useState} from 'react'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Nav from '../components/Nav'
import FirstVideo from '../components/FirstVideo'
import VideoList from '../components/VideoList'

export default function Home({trending, TVShows, actionList, genreList}) {
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
        <VideoList results={actionList.results} title="Action"/>
        <Loader showLoader={showLoader}/>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  let data = [];

  let genres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIE_DB_KEY}&adult=false&append_to_response=genre`)
  let genreList = await genres.json()

  async function fetchGenreData(genreList) {
      
      let i;
      for (i = 0; i < genreList.genres.length; i++) {
        // let test = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_DB_KEY}&adult=false&with_genres=genreList.genres.[i].id`)
        // let test2 = await test.json();
        //data.push(test2)
      }
      console.log(data)
  }
  fetchGenreData()

  let resTrending = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.MOVIE_DB_KEY}&adult=false`)
  let trending = await resTrending.json()

  let resTVShows = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.MOVIE_DB_KEY}&adult=false`)
  let TVShows = await resTVShows.json()

  //18 genres
  let resAction = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_DB_KEY}&adult=false&with_genres=28`)
  let actionList = await resAction.json()

  return {
    props: {
      trending,
      TVShows,
      actionList,
      genreList
    }
  }
}
