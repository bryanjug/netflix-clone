import Image from 'next/image'
import styles from '../styles/FirstVideo.module.css'

const FirstVideo = () => {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
               <p>Rousing | Exciting | Reality TV | Makeover | Cars</p> 
               <p>Info</p>
               <p>Play</p>
            </div>
        </div>
    )
}

export default FirstVideo
