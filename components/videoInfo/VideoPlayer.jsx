import styles from '../../styles/VideoPlayer.module.css'

const VideoPlayer = ({videoId}) => {
    //https://www.youtube.com/watch?v=${.key}
    let src = "https://www.youtube.com/embed/" + videoId;
    
    return (
        <div>
            <iframe 
            width="560" 
            height="315" 
            src={src} 
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
