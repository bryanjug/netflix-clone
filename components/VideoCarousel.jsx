import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image'
import styles from './../styles/VideoCarousel.module.css'

function VideoCarousel ({videos}) {
    return (
        <div className={styles.container}>
            <Carousel 
                emulateTouch={true}
                infiniteLoop={true}
                showIndicators={false}
                showThumbs={false}
            >
                {
                    videos.length !== 0 ? 
                    videos.map(function(result, index) {
                        if (result.site === "YouTube") {
                            return (
                                <div key={index}>
                                    <a
                                        href={`https://www.youtube.com/watch?v=${result.key}`} 
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image 
                                            src={`https://img.youtube.com/vi/${result.key}/0.jpg`} 
                                            alt="The video's cover image." 
                                            height="400"
                                            width="500"
                                        />
                                        <p className="legend">{result.name}</p>
                                    </a>
                                </div>
                            )
                        } else {
                            return (
                                <div>
                                    <Image 
                                        src={`https://img.youtube.com/vi/${result.key}/0.jpg`} 
                                        alt="The video's cover image." 
                                        height="400"
                                        width="500"
                                    />
                                    <p className="legend">{result.name}</p>
                                </div>
                            )
                        }
                    })
                    :
                    null
                }
            </Carousel>
        </div>
    );
};

export default VideoCarousel;