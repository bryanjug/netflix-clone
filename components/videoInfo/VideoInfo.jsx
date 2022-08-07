import Meta from '../Meta'
import NavInfo from './NavInfo'
import YoutubePlayer from './YoutubePlayer'
import styles from '../../styles/videoInfo/VideoInfo.module.css'
import Chip from '@mui/material/Chip'
import FaceIcon from '@mui/icons-material/Face'
import {useState, useEffect} from 'react'
import Image from 'next/image'
import Dropdown from '../../components/videoInfo/Dropdown'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import GradeIcon from '@mui/icons-material/Grade';

const VideoInfo = ({id, info, type, companies, countries, videos, seasons}) => {
    const [videosButtonStyles, setVideosButtonStyles] = useState(styles.tabClicked);
    const [seasonsButtonStyles, setSeasonsButtonStyles] = useState(styles.tabNotClicked);

    const [currentTab, setCurrentTab] = useState("videos");
    const [seasonsAndEpisodes, setSeasonsAndEpisodes] = useState();
    
    const [copyButtonText, setCopyButtonText] = useState("Share")
    const [copyButtonColor, setCopyButtonColor] = useState(styles.shareButton)

    function Copy() {
        navigator.clipboard.writeText(window.location.href);
        setCopyButtonText("Copied!")
        setCopyButtonColor(styles.shareButtonGreen)
        const myTimeout = setTimeout(changeColor, 3000);
        function changeColor() {
            setCopyButtonText("Share")
            setCopyButtonColor(styles.shareButton)
            clearTimeout(myTimeout);
        }
    }
    function SeasonsClick() {
        setCurrentTab("seasons")
        if (videos.length !== 0) {
            setVideosButtonStyles(styles.tabNotClicked)
        }
        setSeasonsButtonStyles(styles.tabClicked)
    }
    function VideosClick() {
        setCurrentTab("videos")
        if (seasons.length !== 0) {
            setSeasonsButtonStyles(styles.tabNotClicked)
        }
        setVideosButtonStyles(styles.tabClicked)
    }
    useEffect(() => {
        function LoadButtons() {
            //check if seasons or videos are available.
            if (videos.length !== 0 && seasons.length !== 0) {
                setVideosButtonStyles(styles.tabClicked)
                setCurrentTab("videos")
                setSeasonsButtonStyles(styles.tabNotClicked)
            } else {
                if (videos.length !== 0 && seasons.length === 0) {
                    setVideosButtonStyles(styles.tabClicked)
                    setCurrentTab("videos")
                    setSeasonsButtonStyles(styles.displayNone)
                }
                if (videos.length === 0 && seasons.length !== 0) {
                    setSeasonsButtonStyles(styles.tabClicked)
                    setCurrentTab("seasons")
                    setVideosButtonStyles(styles.displayNone)
                }
            }
        }
        LoadButtons()
    }, [seasons.length, videos.length])
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
                    <div className={styles.missingPlayer}></div>
                    :
                    <YoutubePlayer videos={videos} />
                }
                <h2 className={styles.title}>
                    {info.title}
                </h2>
                {
                    info.vote_average ?
                    <span className={styles.voteAverage}><GradeIcon className={styles.star} />{info.vote_average.toFixed(1)}</span>
                    :
                    <div></div>
                }
                {
                    info.adult === false ?
                    <span className={styles.notAdult}>TV-MA</span>
                    :
                    <span>TV-MA</span>
                }
                {
                    info.release_date ?
                    <Chip icon={<UpdateIcon />} label={info.release_date} className={styles.chip}/>
                    :
                    <div></div>
                }
                {
                    info.vote_average ? 
                    <Chip icon={<FaceIcon />} label={`Vote Count: ${info.vote_count}`} className={styles.chip}/>
                    :
                    <div></div>
                }
                {
                    info.revenue ?
                    <Chip icon={<FaceIcon />} label={`Revenue: $${info.revenue}`} className={styles.chip}/>
                    :
                    <div></div>
                }
                {
                    info.budget ?
                    <Chip icon={<FaceIcon />} label={`Budget: $${info.budget}`} className={styles.chip}/>
                    :
                    <div></div>
                }
                <br />
                <button>Play</button>
                <br />
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
                <br />
                <Button className={copyButtonColor} onClick={Copy} variant="contained" color="primary" endIcon={<ContentCopyIcon />}>
                    {copyButtonText}
                </Button>
                <div className={styles.buttonList}>
                    <p className={videosButtonStyles} onClick={VideosClick}>VIDEOS</p>
                    <p className={seasonsButtonStyles} onClick={SeasonsClick}>SEASONS</p>
                </div>
                <div> 
                    {
                        currentTab === "seasons" && seasonsAndEpisodes && seasons.length !== 0 ?
                        seasonsAndEpisodes.map(function(result, index) {
                            return (
                                <Dropdown key={index} season={result.season.name} id={result.season.id} seasonNumber={result.season.season_number} episodes={result.season.episodes} />    
                            );
                        })
                        :
                        <div></div>
                    }
                    {   
                        currentTab === "videos" && videos.length !== 0 ? 
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