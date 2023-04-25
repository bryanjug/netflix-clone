import {useEffect, useState, CSSProperties} from 'react';
import VideoItem from './VideoItem'
import styles from '../styles/VideoList.module.css'
import placeholderImage from '/public/placeholder.png'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const VideoList = ({title, results, type}) => {
    const arrowStyles = {
        position: 'absolute',
        zIndex: 2,
        top: '1em',
        width: 30,
        height: "100%",
        cursor: 'pointer',
    };

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
            <Carousel 
                className={styles.container}
                emulateTouch={true}
                infiniteLoop={false}
                showIndicators={false}
                showThumbs={false}
                centerMode={true}
                centerSlidePercentage={33}
                showStatus={false}
                selectedItem={1}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 0 }} className={styles.carouselButton}>
                            <ArrowLeftIcon className={styles.leftArrow} />
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 0 }} className={styles.carouselButton}>
                            <ArrowRightIcon className={styles.rightArrow} />
                        </button>
                    )
                }
            >
                {
                    results && type ?
                    results.map((result, index) => (
                        result.title ? 
                        <div 
                            key={index} 
                            className={styles.videoItemContainer}
                        >
                            <VideoItem 
                                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                                vote_average={result.vote_average}
                                title={result.title}
                                id={result.id}
                                type={type}
                                className={styles.videoImage}
                            />
                        </div>
                        :
                        result.name ?
                        <div 
                            key={index} 
                            className={styles.videoItemContainer}
                        >
                            <VideoItem 
                                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}  
                                vote_average={result.vote_average}
                                title={result.name}
                                id={result.id}
                                type={type}
                                className={styles.videoImage}
                            />
                        </div>
                        :
                        null
                    ))
                    :
                    null
                }
            </Carousel>  
        </div>
    )
}

export default VideoList
