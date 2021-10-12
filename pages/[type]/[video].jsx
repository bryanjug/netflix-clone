import {useRouter} from 'next/router'
import VideoInfo from '../../components/videoInfo/VideoInfo'
import {useEffect, useState} from 'react'

export default function Video() {
    const [info, setInfo] = useState([]);
    const [videos, setVideos] = useState("");
    const [companies, setCompanies] = useState([]);
    const [countries, setCountries] = useState([]);

    let router = useRouter();
    let id = router.query.video;
    let type = router.query.type;

    useEffect(() => {
        if(!id) {
            return;
        }
        const fetchInfoById = async () => {
            let response;
            let data;
            if (router.query.type === "movie") {
                response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}&append_to_response=videos`)
                data = await response.json()
            }
            if (router.query.type === "tv") {
                response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}&append_to_response=videos`)
                data = await response.json()
            }
            setInfo(data)
            setCompanies(data.production_companies);
            setCountries(data.production_countries);
            setVideos(data.videos.results)
        }
        fetchInfoById()
    }, [id])

    return (
        <VideoInfo 
            id={id} 
            info={info}
            type={type}
            companies={companies}
            countries={countries}
            videos={videos}
        />
    );
}