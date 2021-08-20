import {useEffect, useState} from 'react'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Nav from '../components/Nav'
import FirstVideo from '../components/FirstVideo'
import VideoList from '../components/VideoList'
import GenreList from '../components/GenreList'

export default function Home({trending, TVShows, genreList}) {
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
        <VideoList list={trending} title="Trending Now"/>
        <VideoList list={TVShows} title="TV Shows"/>
        <GenreList genreList={genreList}/>
        <Loader showLoader={showLoader}/>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const resTrending = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.MOVIE_DB_KEY}&adult=false`)
  const trending = await resTrending.json()

  const resTVShows = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.MOVIE_DB_KEY}&adult=false`)
  const TVShows = await resTVShows.json()

  const genres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIE_DB_KEY}&language=en-US`)
  const genreList = await genres.json()

  return {
    props: {
      trending,
      TVShows,
      genreList
    }
  }
}
