import {useEffect, useState} from 'react'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Nav from '../components/Nav'
import Image from 'next/image'

export default function Home({trending}) {
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
        <Image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcinemovie.tv%2Fimages%2Fstories%2FMoviePosters%2FAXL_Movie_Poster.jpg&f=1&nofb=1" alt="Netflix logo" layout="responsive" height="100" width="50" />
        <h1>Netflix</h1><h1>Netflix</h1><h1>Netflix</h1><h1>Netflix</h1><h1>Netflix</h1>
        <Loader showLoader={showLoader}/>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.MOVIE_DB_KEY}&adult=false`)
  const trending = await res.json()

  return {
    props: {
      trending
    }
  }
}
