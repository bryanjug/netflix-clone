import {useEffect, useState} from 'react'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Nav from '../components/Nav'
import FirstVideo from '../components/FirstVideo'
import VideoItem from '../components/VideoItem'

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
        <p><b>Popular on Netflix</b></p>
        <VideoItem src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.fandango.com%2FImageRenderer%2F0%2F0%2Fredesign%2Fstatic%2Fimg%2Fdefault_poster.png%2F0%2Fimages%2Fmasterrepository%2Ffandango%2F221985%2FDarbar2020.jpg&f=1&nofb=1" />
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
