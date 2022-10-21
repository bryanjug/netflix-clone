import { Skeleton } from "@mui/material";
import styles from "../styles/VideoItem.module.css";
import Image from "next/image";
import StarIcon from '@material-ui/icons/Star';
import Link from 'next/link'

const VideoItem = ({ src, vote_average, title, id, type }) => {
    console.log(src)
	return (
		<Link as={`/${type}/${id}`} href="/[type]/[video]" passHref>
			<div className={styles.container}>
                <Image 
                    src={src}
                    alt={title}
                    className={styles.image} 
                    layout="fill" 
                    placeholder='blur'
                    blurDataURL='../public/blur.png'
                />
                <p className={styles.title}>{title}</p>
				<small className={styles.overlay}>
					<b className={styles.topContainer}>
						<span className={styles.top}>
							<StarIcon className={styles.star}/>
						</span>
						<br />
					</b>
					{vote_average.toFixed(1)}
				</small>
			</div>
		</Link>
	);
};

export default VideoItem;