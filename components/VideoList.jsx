import VideoItem from './VideoItem'
import styles from '../styles/VideoList.module.css'

const VideoList = ({trending, title}) => {
    let results = trending.results;
    console.log(results)
    return (
        <div className={styles.mainContainer}>
            <h4 className={styles.title}><b>{title}</b></h4>
            <div className={styles.container}>
                {
                    results.map((result) => (
                        <VideoItem src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} />
                    ))
                }
            </div>
        </div>
    )
}

export default VideoList
