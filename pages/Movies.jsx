import React, {useEffect, useState} from 'react'
import styles from './../styles/Movies/Movies.module.css'
import Nav from '../components/Nav'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import VideoList from '../components/VideoList'

export default function Movies() {
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
  
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  useEffect(() => {
    function PlaySomething() {
      //result count: 20 in db
      let randomObj = randomIntFromInterval(0, 19) 
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

  function DisplayMoviesLists() {
    let lists = [];
    let i;
    for (i = 0; i < 11; i++) {
      let dataName = "popularMovies" + i
      
      console.log(data.[dataName])

      if (i === 0 && data.popularMovies) {
        lists.push(
          <VideoList 
            results={data.popularMovies.results} 
            title="Movies" 
            type="movie"
          />
        );
      }
      if (i > 0 && data.[dataName]) {
        lists.push(
          <VideoList 
            results={data.[dataName].results} 
            type="movie"
          />
        );
      }
    }
    return (
      <div>
        {lists}
      </div>
    );
  }
  
  return (
    <div>
      <head>
        <Meta
          title="Netflix Movies" 
          description="Find the most popular movies on one platform."
          keywords="Netflix, television, shows, online, watch, new, favorites, movies, popular, tv"
        />
      </head>
      <main>
        <Loader 
          showLoader={showLoader}
        />
        <Nav
          playSomething={playSomething}
        />
        <div className={styles.container}>
            <div className={styles.firstSection}>
                {DisplayMoviesLists()}
            </div>
        </div>
        
      </main>
    </div>
  )
}