import {useRouter} from 'next/router'
import VideoInfo from '../components/videoInfo/VideoInfo'
import {useEffect, useState} from 'react'

export default function Video({testData}) {
    const [info, setInfo] = useState([]);
    console.log(info)

    const router = useRouter();
    const id = router.query.video;

    useEffect(() => {
        if(!id) {
            return;
        }
        const fetchSomethingById = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}&append_to_response=videos`)
            const data = await response.json()
            setInfo(data)
        }
        fetchSomethingById()
    }, [id])

    return (
        <VideoInfo 
            id={id} 
            videoId={info.videos.results.[0].key}
            title={info.title}
        />
    );
}

export const getStaticProps = async () => {
    let resMovie = await fetch(`https://api.themoviedb.org/3/movie/343611?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}&append_to_response=videos`)
    let movieData = await resMovie.json()

    let resTest = await fetch(`https://api.themoviedb.org/3/movie/343611/videos?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`)
    let testData = await resTest.json()

    return {
        props: {
            movieData,
            testData
        }
    }
}

export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}