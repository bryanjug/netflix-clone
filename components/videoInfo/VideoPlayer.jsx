import { styled } from "@material-ui/core"
import { StylesContext } from "@material-ui/styles"
import styles from '../../styles/VideoPlayer.module.css'

const VideoPlayer = () => {
    //https://www.youtube.com/watch?v=${.key}
    return (
        <div>
            <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/DTBcGQWmQ1c" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className={styles.video}
            >
            </iframe>
        </div>
    )
}

export default VideoPlayer
