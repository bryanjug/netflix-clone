import {useEffect, useState} from 'react'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Nav from '../components/Nav'
import FirstVideo from '../components/FirstVideo'
import VideoList from '../components/VideoList'

export default function Home({trending, TVShows, genreData}) {
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
        {
          genreData.map(result => 
            (
              <VideoList results={result.[1]} title={result.[0]}/>
            )
          )
        }
        <Loader showLoader={showLoader}/>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  let resTrending = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.MOVIE_DB_KEY}`)
  let trending = await resTrending.json()

  let resTVShows = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.MOVIE_DB_KEY}`)
  let TVShows = await resTVShows.json()

  let genreData = [];

  async function fetchGenreData() {
      let genres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIE_DB_KEY}&append_to_response=genre`)
      let genreList = await genres.json()

      let i;
      for (i = 0; i < genreList.genres.length; i++) {
        let test = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_DB_KEY}&with_genres=${genreList.genres[i].id}`)
        let test2 = await test.json();
        genreData.push([genreList.genres.[i].name, test2.results])
      }
  }
  await fetchGenreData()

  return {
    props: {
      trending,
      TVShows,
      genreData
    }
  }
}
