import {useRouter} from 'next/router'
import VideoInfo from '../../components/videoInfo/VideoInfo'
import {useEffect, useState} from 'react'
import { ColorizeSharp } from '@mui/icons-material';

export default function Video() {
    const [info, setInfo] = useState([]);
    const [videoId, setVideoId] = useState("");
    const [companies, setCompanies] = useState([]);

    let router = useRouter();
    let id = router.query.video;
    let type = router.query.type;

    useEffect(() => {
        if(!id) {
            return;
        }
        const fetchSomethingById = async () => {
            if (router.query.type === "movie") {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}&append_to_response=videos`)
                const data = await response.json()
                setInfo(data)
                setVideoId(data.videos.results.[0].key);
                setCompanies(data.production_companies);
            }
            if (router.query.type === "tv") {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}&append_to_response=videos`)
                const data = await response.json()
                setInfo(data)
                setVideoId(data.videos.results.[0].key);
            }
        }
        fetchSomethingById()
    }, [id])

    return (
        <VideoInfo 
            id={id} 
            videoId={videoId}
            info={info}
            type={type}
            companies={companies}
        />
    );
}