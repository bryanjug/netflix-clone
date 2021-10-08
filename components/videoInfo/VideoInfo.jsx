import Meta from '../Meta'
import NavInfo from './NavInfo'
import YoutubePlayer from './YoutubePlayer'
import styles from '../../styles/VideoInfo.module.css'
import Chip from '@mui/material/Chip'
import FaceIcon from '@mui/icons-material/Face'
import {useEffect, useState} from 'react'

const VideoInfo = ({id, videoId, info, type, companies, countries, videos}) => {
    console.log(info)
    let title = info.title;
    let date = info.release_date;

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
                    <YoutubePlayer videoId={videoId} />
                }
                <h1>
                    {title}
                </h1>
                <Chip icon={<FaceIcon />} label={date && date.substr(0, 4)} className={styles.chip}/>
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
                <button>Rate</button>
                <button>Share</button>
                <button>EPISODES</button>
                <button>COLLECTION</button>
                <button>TRAILERS & MORE</button>
            </main>
        </div>
    )
}

export default VideoInfo