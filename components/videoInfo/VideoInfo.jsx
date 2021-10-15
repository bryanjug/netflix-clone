import Meta from '../Meta'
import NavInfo from './NavInfo'
import YoutubePlayer from './YoutubePlayer'
import styles from '../../styles/videoInfo/VideoInfo.module.css'
import Chip from '@mui/material/Chip'
import FaceIcon from '@mui/icons-material/Face'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import Dropdown from '../../components/videoInfo/Dropdown'

const VideoInfo = ({id, info, type, companies, countries, videos, seasons}) => {
    console.log(info)
    
    const [seasonsStyles, setSeasonsStyles] = useState(styles.tabClicked);
    const [collectionStyles, setCollectionStyles] = useState(styles.tabNotClicked);
    const [videosStyles, setVideosStyles] = useState(styles.tabNotClicked);
    const [currentTab, setCurrentTab] = useState("seasons");

    function Copy() {
        navigator.clipboard.writeText(window.location.href);
    }
    function SeasonsClick() {
        setSeasonsStyles(styles.tabClicked);
        setCollectionStyles(styles.tabNotClicked)
        setVideosStyles(styles.tabNotClicked)
        setCurrentTab("seasons")
    }
    function CollectionClick() {
        setSeasonsStyles(styles.tabNotClicked);
        setCollectionStyles(styles.tabClicked)
        setVideosStyles(styles.tabNotClicked)
        setCurrentTab("collection")
    }
    function VideosClick() {
        setSeasonsStyles(styles.tabNotClicked);
        setCollectionStyles(styles.tabNotClicked)
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
                    <p className={seasonsStyles} onClick={SeasonsClick}>SEASONS</p>
                    <p className={collectionStyles} onClick={CollectionClick}>COLLECTION</p>
                    <p className={videosStyles} onClick={VideosClick}>VIDEOS</p>
                </div>
                <div> 
                    {
                        currentTab === "seasons" && seasons.length !== 0 ?
                        seasons.map(function(result, index) {
                            return (
                                <Dropdown key={index} season={result.name} />    
                            );
                        })
                        :
                        <div></div>
                    }
                    {   
                        currentTab === "videos" && videos.length !== 0  ? 
                        videos.map(function(result, index) {
                            return (
                                <p key={index}>
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
                                </p>
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