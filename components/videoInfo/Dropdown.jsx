import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from '../../styles/videoInfo/Dropdown.module.css'
import { useEffect, useState } from 'react'

const Dropdown = ({season, episodes, id, seasonNumber}) => {
    return (
        <div>
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
                <AccordionDetails>
                    {/* 
                        0: {
                            air_date: "2021-10-21"
                            crew: (3) [{…}, {…}, {…}]
                            episode_number: 1
                            guest_stars: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
                            id: 3014880
                            name: "Last Day"
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
                            return (
                                <p key={index}>Test</p>
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
