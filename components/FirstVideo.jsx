import styles from '../styles/FirstVideo.module.css'
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Link from 'next/link'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useEffect, useState } from 'react';

const FirstVideo = ({firstVideoData}) => {
    let posterPath = `https://image.tmdb.org/t/p/w500${firstVideoData.poster_path}`;
    let db = `${process.env.NEXT_PUBLIC_DATABASE}db`;
    let apiKey = process.env.NEXT_PUBLIC_API_TOKEN;
    let apiLink = process.env.NEXT_PUBLIC_MOVIE_DB;
    const [data, setData] = useState([]);

    console.log(firstVideoData)

    return (
        <div className={styles.container} style={{backgroundImage: `url(${posterPath})`}}>
            <div className={styles.videoInfo}>
                <p className={styles.genres}>{firstVideoData.genres}</p>
                <p className={styles.title}>
                    {firstVideoData.title}
                </p>
                <div className={styles.buttons}>
                    {
                        firstVideoData.id ?
                        <Link as={`/movie/${firstVideoData.id}`} href="/[type]/[video]" passHref>
                            <small className={styles.info}>
                                <InfoOutlinedIcon className={styles.infoIcon}/>
                                <br/>
                                Info
                            </small>
                        </Link>
                        :
                        null
                    }
                    {
                        firstVideoData.results.homepage ?
                        <a href={firstVideoData.results.homepage} target="_blank" rel="noreferrer">
                            <Button
                                variant="contained"
                                color="default"
                                className={styles.playButton}
                                startIcon={<PlayArrowIcon />}
                            >
                                Play
                            </Button>
                        </a>    
                        :
                        <small className={styles.info}>
                            <StarOutlineIcon className={styles.infoIcon}/>
                            <br/>
                            {firstVideoData.vote_average}
                        </small>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default FirstVideo