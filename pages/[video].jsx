import {useRouter} from 'next/router'
import VideoInfo from '../components/VideoInfo'

export default function Video() {
    const router = useRouter();

    console.log(router.query);
    return (
        <VideoInfo video={router.query.video}/>
    );
}

//https://api.themoviedb.org/3/movie/343611?api_key={api_key}&append_to_response=videos

export const getStaticProps = async () => {
    let resMovie = await fetch(`https://api.themoviedb.org/3/movie/343611?api_key=${process.env.MOVIE_DB_KEY}&append_to_response=videos`)
    let movieData = await resMovie.json()
    console.log(movieData)
    return {
        props: {
            movieData,
        }
    }
}

export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}