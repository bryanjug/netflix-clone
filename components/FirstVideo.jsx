import styles from '../styles/FirstVideo.module.css'
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const FirstVideo = ({firstVideoData}) => {
    let title = firstVideoData.results.[0].title
    let backdropPath = `https://image.tmdb.org/t/p/w500${firstVideoData.results.[0].poster_path}`;

    return (
        <div className={styles.container} style={{backgroundImage: `url(${backdropPath})`}}>
            <div className={styles.videoInfo}>
                <div className={styles.buttons}>
                    <small className={styles.info}>
                        <InfoOutlinedIcon className={styles.infoIcon}/>
                        <br/>
                        Info
                    </small>
                    <Button
                        variant="contained"
                        color="default"
                        className={styles.playButton}
                        startIcon={<PlayArrowIcon />}
                    >
                        Play
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FirstVideo

// <h1 className={styles.title}>{title}</h1>
// <p className={styles.rank}>#1 in the World Today</p> 