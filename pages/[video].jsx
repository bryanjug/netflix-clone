import {useRouter} from 'next/router'
import VideoInfo from '../components/videoInfo/VideoInfo'

export default function Video({testData}) {
    // console.log(testData)

    const router = useRouter();
    console.log(router)
    return (
        <VideoInfo video={router.query.video}/>
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