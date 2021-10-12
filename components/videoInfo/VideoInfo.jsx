import Meta from '../Meta'
import NavInfo from './NavInfo'
import YoutubePlayer from './YoutubePlayer'
import styles from '../../styles/VideoInfo.module.css'
import Chip from '@mui/material/Chip'
import FaceIcon from '@mui/icons-material/Face'
import {useEffect, useState} from 'react'

const VideoInfo = ({id, info, type, companies, countries, videos}) => {
    const [episodesStyles, setEpisodesStyles] = useState(styles.tabClicked);
    const [collectionStyles, setCollectionStyles] = useState(styles.tabNotClicked);
    const [videosStyles, setVideosStyles] = useState(styles.tabNotClicked);
    const [currentTab, setCurrentTab] = useState("episodes");

    console.log(info)

    function Copy() {
        navigator.clipboard.writeText(window.location.href);
    }
    function EpisodesClick() {
        setEpisodesStyles(styles.tabClicked);
        setCollectionStyles(styles.tabNotClicked)
        setVideosStyles(styles.tabNotClicked)
        setCurrentTab("episodes")
    }
    function CollectionClick() {
        setEpisodesStyles(styles.tabNotClicked);
        setCollectionStyles(styles.tabClicked)
        setVideosStyles(styles.tabNotClicked)
        setCurrentTab("collection")
    }
    function VideosClick() {
        setEpisodesStyles(styles.tabNotClicked);
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
                    <p className={episodesStyles} onClick={EpisodesClick}>EPISODES</p>
                    <p className={collectionStyles} onClick={CollectionClick}>COLLECTION</p>
                    <p className={videosStyles} onClick={VideosClick}>VIDEOS</p>
                </div>
                <div>
                    {
                        // currentTab === "videos" ? 
                        //videos.results.[0].key
                        //videos.results.[0].name
                        //videos.results.[0].type
                        ////videos.results.[0].published_at
                    }
                </div>
            </main>
        </div>
    )
}

export default VideoInfo