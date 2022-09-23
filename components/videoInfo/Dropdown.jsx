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
    const [showMoreStyle, setShowMoreStyle] = useState(styles.showMore);
    const [longTextStyle, setLongTextStyle] = useState(styles.longText);
    
    function showMore() {
        setShowMoreStyle(styles.displayNone)
        setLongTextStyle(styles.longTextShown)
    }
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
                    <Typography className={styles.spacer}>
                        Space
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className={styles.accordionDetails}>
                    {/* 
                        0: {
                            [] air_date: "2021-10-21"
                            crew: (3) [{…}, {…}, {…}]
                            episode_number: 1
                            guest_stars: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
                            id: 3014880
                            [] name: "Last Day"
                            overview: "Across the globe, strange and unexplainable events begin to unfold. A small-town sheriff senses something bigger is at play."
                            production_code: ""
                            season_number: 1
                            still_path: "/n3PDSh5qDWM4YAjPVoL0ahcHcaP.jpg"
                            vote_average: 0
                            vote_count: 0
                        }
                        length: 1
                    */}
                    {
                        episodes ? 
                        episodes.map(function(result, index) {
                            
                            console.log(result)
                            
                            return (
                                <div key={index} className={styles.episodeContainer}>
                                    {
                                        result.still_path ?
                                        <div>
                                            <div className={styles.imageContainer}>
                                                {
                                                    result.still_path ?
                                                    <Image
                                                        src={`https://image.tmdb.org/t/p/w300${result.still_path}`}
                                                        alt="The episode's cover image."
                                                        height="200"
                                                        width="300"
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
                                        <p className={longTextStyle}>
                                            {result.overview}
                                        </p>
                                        <p 
                                            className={showMoreStyle}
                                            onClick={showMore}
                                        >
                                            Show more
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div></div>
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Dropdown
