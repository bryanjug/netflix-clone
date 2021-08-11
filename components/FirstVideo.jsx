import styles from '../styles/FirstVideo.module.css'

const FirstVideo = () => {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <h1 className={styles.title}>All American</h1>
                <p className={styles.rank}>#1 in the U.S. Today</p> 
                <div className={styles.buttons}>
                    <p>Info</p>
                    <p>Play</p>
                </div>
            </div>
        </div>
    )
}

export default FirstVideo
