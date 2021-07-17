import {useEffect, useState} from 'react'
import Meta from '../components/Meta'
import styles from '../styles/Home.module.css'
import Loader from '../components/Loader'

export default function Home({trending}) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    console.log(trending)
    if (trending !== []) {
      setShowLoader(false)
    }
  }, [trending])

  return (
    <div className={styles.container}>
      <Meta 
        title="Netflix" 
        description="Watch your favorite TV shows and movies on one platform."
        keywords="Netflix, television, shows, online, watch, new, favorites, movies"
      />
      <main>
        <h1>Netflix</h1>
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
