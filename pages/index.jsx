import {useEffect, useState} from 'react'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Nav from '../components/Nav'
import FirstVideo from '../components/FirstVideo'
import VideoList from '../components/VideoList'
import Link from 'next/link'

export default function Home({trendingData, TVShowsData, genreData, firstVideoData}) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (trendingData !== [] || trendingData === undefined) {
      setShowLoader(false)
    }
  }, [trendingData])

  return (
    <div>
      <Meta 
        title="Netflix" 
        description="Watch your favorite TV shows and movies on one platform."
        keywords="Netflix, television, shows, online, watch, new, favorites, movies"
      />
      <main>
        <Nav />
        <FirstVideo firstVideoData={firstVideoData} />
        <VideoList results={trendingData.results} title="Trending Now" type="movie"/>
        <VideoList results={TVShowsData.results} title="TV Shows" type="tv" />
        {
          genreData.map(result => 
            (
              <VideoList results={result.[1]} title={result.[0]} key={result.[1].id} type="movie" />
            )
          )
        }
        <Loader showLoader={showLoader}/>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  let resTrending = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`)
  let trendingData = await resTrending.json()

  let resTVShows = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`)
  let TVShowsData = await resTVShows.json()

  let resFirstVideo = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`)
  let firstVideoData = await resFirstVideo.json()

  let genreData = [];

  async function fetchGenreData() { //test to see value of genreList
      let genres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}&append_to_response=genre`)
      let genreList = await genres.json()
      
      let i;
      for (i = 0; i < genreList.genres.length; i++) {
        let test = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}&with_genres=${genreList.genres[i].id}`)
        let test2 = await test.json();
        genreData.push([genreList.genres.[i].name, test2.results])
      }
  }
  await fetchGenreData()

  return {
    props: {
      trendingData,
      TVShowsData,
      genreData,
      firstVideoData
    }
  }
}
