import styles from '../styles/FirstVideo.module.css'
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Link from 'next/link'
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const FirstVideo = ({firstVideoData}) => {
    let posterPath = `https://image.tmdb.org/t/p/w500${firstVideoData.poster_path}`;
    
    return (
        <div className={styles.container} style={{backgroundImage: `url(${posterPath})`}}>
            <div className={styles.videoInfo}>
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