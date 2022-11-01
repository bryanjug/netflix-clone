import VideoItem from './VideoItem'
import styles from '../styles/VideoList.module.css'
import placeholderImage from '/public/placeholder.png'

const VideoList = ({title, results, type}) => {
    return (
        <div className={styles.mainContainer}>
            {
                title ?
                <p className={styles.title}>
                    {title}
                </p>
                :
                null
            }
            <div className={styles.container}>
                {
                    results && type ?
                    results.map((result, index) => (
                        result.title ? 
                        <VideoItem 
                            src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                            key={index}
                            vote_average={result.vote_average}
                            title={result.title}
                            id={result.id}
                            type={type}
                        />
                        :
                        result.name ?
                        <VideoItem 
                            src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}  
                            key={index}
                            vote_average={result.vote_average}
                            title={result.name}
                            id={result.id}
                            type={type}
                        />
                        :
                        null
                    ))
                    :
                    null
                }
            </div>  
        </div>
    )
}

export default VideoList
