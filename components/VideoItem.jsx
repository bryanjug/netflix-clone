import styles from "../styles/VideoItem.module.css";
import Image from "next/image";
import StarIcon from '@material-ui/icons/Star';

const VideoItem = ({ src, vote_average }) => {
	return (
		<div className={styles.container}>
			<Image src={src} alt="" className={styles.image} layout="fill" />
			<small className={styles.overlay}>
				<b className={styles.topContainer}>
					<span className={styles.top}>
						<StarIcon className={styles.star}/>
					</span>
					<br />
				</b>
				{vote_average}
            </small>
		</div>
	);
};

export default VideoItem;