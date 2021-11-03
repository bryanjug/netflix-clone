import Meta from '../Meta'
import NavInfo from './NavInfo'
import YoutubePlayer from './YoutubePlayer'
import styles from '../../styles/videoInfo/VideoInfo.module.css'
import Chip from '@mui/material/Chip'
import FaceIcon from '@mui/icons-material/Face'
import {useState, useEffect} from 'react'
import Image from 'next/image'
import Dropdown from '../../components/videoInfo/Dropdown'

const VideoInfo = ({id, info, type, companies, countries, videos, seasons}) => {
    console.log(videos)
    
    const [videosStyles, setVideosStyles] = useState(styles.tabClicked);
    const [seasonsStyles, setSeasonsStyles] = useState(styles.displayNone);

    const [currentTab, setCurrentTab] = useState("videos");
    const [seasonsAndEpisodes, setSeasonsAndEpisodes] = useState();

    useEffect(() => {
        if (seasons.length > 0) {
            setSeasonsStyles(styles.tabNotClicked)
        }
    }, [seasons])
    
    function Copy() {
        navigator.clipboard.writeText(window.location.href);
    }
    async function SeasonsClick() {
        setSeasonsStyles(styles.tabClicked);
        setVideosStyles(styles.tabNotClicked)
        setCurrentTab("seasons")
    }
    useEffect(() => {
        async function FetchEpisodesData() {
            if (currentTab === "seasons" && seasons.length !== 0) {
                let i;
                let list = [];
                for (i = 0; i < seasons.length; i++) {
                    let season = {};
                    let response = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasons[i].season_number}?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`)
                    let data = await response.json()
                    season = seasons[i];
                    season.episodes = data.episodes;
                    list.push({season: season})
                }
                setSeasonsAndEpisodes(list)
            }
        }
        FetchEpisodesData()
    }, [currentTab])

    function VideosClick() {
        setSeasonsStyles(styles.tabNotClicked);
        setVideosStyles(styles.tabClicked)
        setCurrentTab("videos")
    }
    
    return (
        <div>
            <Meta 
                title="Netflix" 
                description="Watch your favorite TV shows and movies on one platform."
                keywords="Netflix, television, shows, online, watch, new, favorites, movies"
            />
            <main>
                <NavInfo /> 
                {
                    videos.length === 0 ?
                    <div></div>
                    :
                    <YoutubePlayer videos={videos} />
                }
                <h1>
                    {info.title}
                </h1>
                <Chip icon={<FaceIcon />} label={info.release_date && info.release_date.substr(0, 4)} className={styles.chip}/>
                {
                    info.adult === false ?
                    <Chip icon={<FaceIcon />} label="TV-MA" className={styles.notAdult}/>
                    :
                    <Chip icon={<FaceIcon />} label="TV-MA" className={styles.chip}/>
                }
                <Chip icon={<FaceIcon />} label={`Vote Average: ${info.vote_average}`} className={styles.chip}/>
                <Chip icon={<FaceIcon />} label={`Vote Count: ${info.vote_count}`} className={styles.chip}/>
                <Chip icon={<FaceIcon />} label={`Revenue: $${info.revenue}`} className={styles.chip}/>
                <Chip icon={<FaceIcon />} label={`Budget: $${info.budget}`} className={styles.chip}/>
                <button>Play</button>
                <button>Where To Watch:</button>
                <p>{info.homepage}</p>
                <p>{info.overview}</p>
                <p>Genres: <span> </span>
                    {
                        info.genres ? 
                        info.genres.map(function(result, index) {
                            if (info.genres.length === 1) {
                                return (
                                    <span key={index}>
                                        {result.name}
                                    </span>
                                )
                            }
                            if (info.genres.length > 1 && index === info.genres.length - 1) {
                                return (
                                    <span key={index}>
                                        {result.name}
                                    </span>
                                )
                            }
                            if (info.genres.length > 1 && index !== info.genres.length - 1) {
                                return (
                                    <span key={index}>
                                        {result.name}, <span> </span>
                                    </span>
                                )
                            }
                        })
                        :
                        <span></span>
                    }
                </p>
                <small>
                    <span>Production Companies: </span> 
                    {
                        companies.map(function(result, index) { 
                            if (companies.length === 1) {
                                return <span key={index}>{result.name}</span>
                            } else {
                                if (index === companies.length - 1) {
                                    return <span key={index}>{result.name}</span>
                                }
                                return <span key={index}>{result.name}, </span>
                            }
                        })
                    }
                </small>
                <br />
                <small>
                    <span>Production Countries: </span> 
                    {
                        countries.map(function(result, index) {
                            if (countries.length === 1) {
                                return <span key={index}>{result.name}</span>
                            } else {
                                if (index === countries.length - 1) {
                                    return <span key={index}>{result.name}</span>
                                }
                                return <span key={index}>{result.name}, </span>
                            }
                        })
                    }
                </small>
                <button onClick={Copy}>Share</button>
                <div className={styles.buttonList}>
                    <p className={videosStyles} onClick={VideosClick}>VIDEOS</p>
                    <p className={seasonsStyles} onClick={SeasonsClick}>SEASONS</p>
                </div>
                <div> 
                    {
                        currentTab === "seasons" && seasonsAndEpisodes ?
                        seasonsAndEpisodes.map(function(result, index) {
                            return (
                                <Dropdown key={index} season={result.season.name} id={result.season.id} seasonNumber={result.season.season_number} episodes={result.season.episodes} />    
                            );
                        })
                        :
                        <div></div>
                    }
                    {   
                        currentTab === "videos" && videos.length !== 0  ? 
                        videos.map(function(result, index) {
                            return (
                                <a key={index} href={`https://www.youtube.com/watch?v=${result.key}`} target="_blank">
                                    {index + 1} 
                                    <Image
                                        src={`https://img.youtube.com/vi/${result.key}/0.jpg`}
                                        alt="Picture of the author"
                                        height="200"
                                        width="300"
                                    />
                                    <h3>{result.name}</h3>
                                    <p>{result.type}</p>
                                    <h5>{result.published_at.slice(0,4)}</h5>
                                </a>
                            )
                        })
                        :
                        <div></div>
                    }
                </div>
            </main>
        </div>
    )
}

export default VideoInfo