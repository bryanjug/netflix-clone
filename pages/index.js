import {useEffect, useState} from 'react'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Nav from '../components/Nav'
import FirstVideo from '../components/FirstVideo'

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
        <FirstVideo />
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
