import Image from 'next/image'
import styles from '../../styles/videoInfo/FirstImage.module.css'

const FirstImage = ({firstImage}) => {
    let backdropPath = `https://image.tmdb.org/t/p/original${firstImage}`;
    return (
        <div className={styles.container}>
            <Image 
                src={backdropPath}
                alt="Cover image"
                layout="fill"
                blurDataURL='../../public/blur.png'
                placeholder='blur'
                className={styles.image}
            />
        </div>
    );
}

export default FirstImage