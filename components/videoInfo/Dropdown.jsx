import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from '../../styles/videoInfo/Dropdown.module.css'
import Image from 'next/image'
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from 'react'
import image from 'next/image'

const Dropdown = ({season, episodes, id, seasonNumber}) => {
    return (
        <div className={styles.container}>
            <Accordion className={styles.accordion}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon className={styles.icon} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={styles.accordionSummary}
                >
                    <Typography className={styles.season}>
                        {season}
                    </Typography>

                </AccordionSummary>
                <AccordionDetails className={styles.accordionDetails}>
                    {
                        episodes ? 
                        episodes.map(function(result, index) {
                            return (
                                <div key={index} className={styles.episodeContainer}>
                                    {
                                        result.still_path ?
                                        <div>
                                            <div className={styles.imageContainer}>
                                                {
                                                    result.still_path ?
                                                    <Image
                                                        src={`https://image.tmdb.org/t/p/original${result.still_path}`}
                                                        alt="The episode's cover image."
                                                        height="450"
                                                        width="750"
                                                        placeholder='blur'
                                                        blurDataURL='../../public/blur.png'
                                                        className={styles.image}
                                                    />
                                                    :
                                                    <Image  
                                                        src="/placeholder.jpg"
                                                        alt="Missing image."
                                                        height="200"
                                                        width="300"
                                                        placeholder='blur'
                                                        blurDataURL='../../public/blur.png'
                                                        className={styles.image}
                                                    />
                                                }
                                                
                                            </div>
                                            <div className={styles.imageGradient}></div>
                                        </div>
                                        :
                                        <div className={styles.missingImage}>
                                            
                                        </div>
                                    }
                                    <div className={styles.episodeInfo}>
                                        <p className={styles.name}>{result.name}</p>
                                        <p className={styles.smallText}>
                                            <StarIcon className={styles.star}/>
                                            {result.vote_average} • {result.air_date.slice(0,4)} • Episode {result.episode_number}
                                        </p>
                                        <p className={styles.longText}>
                                            {result.overview}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        null
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Dropdown
