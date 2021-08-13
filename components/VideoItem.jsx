import styles from '../styles/VideoItem.module.css'
import Image from 'next/image'

const VideoItem = ({src}) => {
    return (
        <div className={styles.container}>
            <Image 
                src={src} 
                alt=""
                className={styles.image}
                layout="fill"
            />
            <p className={styles.overlay}>Overlay Text</p>
        </div>
    )
}

export default VideoItem
