import styles from '../styles/FirstVideo.module.css'
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const FirstVideo = () => {

    return (
        <div className={styles.container}>
            <div className={styles.videoInfo}>
                <h1 className={styles.title}>All American</h1>
                <p className={styles.rank}>#1 in the U.S. Today</p> 
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
