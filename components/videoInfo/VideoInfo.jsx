import Meta from '../Meta'
import NavInfo from './NavInfo'
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
import FirstImage from './FirstImage'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Stack from '@mui/material/Stack';
const VideoInfo = ({id, info, type, companies, countries, videos, seasons}) => {
    console.log(info)
    const [videosButtonStyles, setVideosButtonStyles] = useState(styles.tabClicked);
    const [seasonsButtonStyles, setSeasonsButtonStyles] = useState(styles.tabNotClicked);

    const [currentTab, setCurrentTab] = useState("videos");
    const [seasonsAndEpisodes, setSeasonsAndEpisodes] = useState();
    
    const [copyButtonText, setCopyButtonText] = useState("Share")
    const [copyButtonColor, setCopyButtonColor] = useState(styles.shareButton)

    const [stars, setStars] = useState([]);

    const [showMoreStyle, setShowMoreStyle] = useState(styles.showMore);

    const [longTextStyle, setLongTextStyle] = useState(styles.longText);

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

    function showMore() {
        setShowMoreStyle(styles.displayNone)
        setLongTextStyle(styles.longTextShown)
    }

    useEffect(() => {
        if (info.vote_average > 0) {
            let i;
            for (i = 0; i < info.vote_average.toFixed(); i++) {
                setStars(stars => [...stars,<GradeIcon className={styles.stars} key={i} />] );
            }
        }
    }, [info.vote_average])  

    return (
        <div>
            <Meta 
                title="Netflix" 
                description="Watch your favorite TV shows and movies on one platform."
                keywords="Netflix, television, shows, online, watch, new, favorites, movies"
            />
            <main>
                <NavInfo /> 
                <div className={styles.firstImageContainer}>
                    <FirstImage 
                        firstImage={info.backdrop_path}
                    />
                    <div className={styles.imageCover}>
                        <h2 className={styles.title}>
                            {
                                info.title ? info.title
                                : info.name ? info.name 
                                : info.original_name ? info.original_name
                                :
                                <div></div>
                            }
                            &nbsp;{
                                info.release_date ?
                                `(${info.release_date.slice(0, 4)})`
                                :
                                <div></div>
                            }
                        </h2>
                        <p className={styles.tagline}>
                            {
                                info.tagline ? info.tagline
                                :
                                <div></div>
                            }
                        </p>
                        <div className={styles.starsContainer}>
                            {stars}
                        </div>
                    </div>
                </div>
                <div>
                    <p className={styles.sectionTitle}>Overview:</p>
                    <p className={longTextStyle}>
                        {   
                            info.overview
                        }
                    </p>
                    <p className={showMoreStyle} onClick={showMore}>
                        Show more
                    </p>
                </div>
                <div>
                    <a href={info.homepage} target="_blank" rel="noreferrer">
                        <button className={styles.playButton}>
                            <PlayArrowIcon className={styles.playArrow} />
                            <span className={styles.playButtonText}>PLAY</span> 
                        </button>
                    </a>
                </div>
                <div>
                    <Button className={copyButtonColor} onClick={Copy} variant="contained" color="primary" endIcon={<ContentCopyIcon />}>
                        {copyButtonText}
                    </Button>
                </div>
                <div className={styles.statsGroupContainer}>
                    <div className={styles.statsContainer}>
                        <p className={styles.statsTitle}>Rating</p>
                        {
                            info.vote_average ?
                            <p>{info.vote_average.toFixed(1)}</p>
                            :
                            <div>
                                <p>0</p>
                            </div>
                        }
                    </div>
                    <div className={styles.statsContainer2}>
                        <p className={styles.statsTitle}>Adult</p>
                        {
                            info.adult === false ?
                            <div>
                                <p className={styles.notAdult}>TV-MA</p>
                            </div>
                            :
                            <div>
                                <p>TV-MA</p>
                            </div>
                        }
                    </div>
                    <div className={styles.statsContainer3}>        
                        <p className={styles.statsTitle}>Release Date</p>            
                        {
                            info.release_date ?
                            <div>
                                <p>{info.release_date}</p>
                            </div>
                            :
                            <div>
                                <p>N/A</p>
                            </div>
                        }
                    </div>
                    <div className={styles.statsContainer}>
                        <p className={styles.statsTitle}>Vote Count</p>
                        {
                            info.vote_average ? 
                            <div>
                                <p>{info.vote_count}</p>
                            </div>
                            :
                            <div>
                                <p>0</p>
                            </div>
                        }
                    </div>
                    <div className={styles.statsContainer2}>
                        <p className={styles.statsTitle}>Revenue</p>
                        {
                            info.revenue ?
                            <div>
                                <p>${info.revenue}</p>
                            </div>
                            :
                            <div>
                                <p>$0</p>
                            </div>
                        }
                    </div>
                    <div className={styles.statsContainer3}>
                        <p className={styles.statsTitle}>Budget</p>
                        {
                            info.budget ?
                            <div>
                                <p>${info.budget}</p>
                            </div>
                            :
                            <div>
                                <p>$0</p>
                            </div>
                        }
                    </div>   
                </div>             
                <p className={styles.sectionTitle}>Genres:</p>
                <div className={styles.chipsContainer}>
                    <p>
                    {
                        info.genres ? 
                        info.genres.map(function(result, index) {
                            return (
                                <Chip key={index} label={result.name} className={styles.chip} />
                            )
                        })
                        :
                        <span></span>
                    }
                    </p>
                </div>
                <p className={styles.sectionTitle}>Production Companies: </p> 
                <div className={styles.chipsContainer}>
                    {
                        companies ? 
                        companies.map(function(result, index) { 
                            return <Chip key={index} label={result.name} className={styles.chip} />
                        })
                        :
                        <span></span>
                    }
                </div>
                <p className={styles.sectionTitle}>Production Countries: </p> 
                <div className={styles.chipsContainer}>
                
                    {
                        countries ?
                        countries.map(function(result, index) {
                            if (countries.length === 1) {
                                return <Chip key={index} label={result.name} className={styles.chip} />
                            } else {
                                if (index === countries.length - 1) {
                                    return <Chip key={index} label={result.name} className={styles.chip} />
                                }
                                return <Chip key={index} label={result.name} className={styles.chip} />
                            }
                        })
                        : 
                        <span></span>
                    }
                </div>
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
                        console.log(videos)
                
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