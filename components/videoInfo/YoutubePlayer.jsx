import styles from '../../styles/VideoPlayer.module.css'
import {useState, useEffect} from 'react'

const YoutubePlayer = ({videos}) => {
    const [videoId, setVideoId] = useState("");
    
    useEffect(() => {
        if (videos.length !== 0) {
            for (let i = 0; i < videos.length; i++) {
                if (videos.[i].type === "Trailer") {
                    setVideoId(videos.[i].key)
                    return;
                }
            }
            if (videoId === "") {
                for (let i = 0; i < videos.length; i++) {
                    if (videos.[i].type === "Teaser" || videos.[i].type === "Featurette" || videos.[i].type === "Clip") {
                        setVideoId(videos.[i].key)
                        return;
                    }
                }
            }
        }
    }, [videos])
    
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

export default YoutubePlayer
