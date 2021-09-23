import VideoItem from './VideoItem'
import styles from '../styles/VideoList.module.css'

const VideoList = ({results, title}) => {
    return (
        <div className={styles.mainContainer}>
            <h4 className={styles.title}>
                <b>{title}</b>
            </h4>
            <div className={styles.container}>
                {
                    results.map((result) => (
                        
                        result.title !== undefined ? 
                        <VideoItem 
                            src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} 
                            key={result.id}
                            vote_average={result.vote_average}
                            title={result.title}
                        />
                        :
                        <VideoItem 
                            src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} 
                            key={result.id}
                            vote_average={result.vote_average}
                            title={result.name}
                        />
                        
                    ))
                }
            </div>
        </div>
    )
}

export default VideoList
