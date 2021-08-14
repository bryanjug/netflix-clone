import styles from "../styles/VideoItem.module.css";
import Image from "next/image";

const VideoItem = ({ src }) => {
	return (
		<div className={styles.container}>
			<Image src={src} alt="" className={styles.image} layout="fill" />
			<small className={styles.overlay}>
				<b className={styles.topContainer}>
					<span className={styles.top}>Top</span>
					<br />
					10
                </b>
            </small>
		</div>
	);
};

export default VideoItem;