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
                    {/* {
                        episodes.length !== 0 ? 
                        episodes.map(function(result, index) {
                            return (
                                <p key={index}>{result.name}</p>
                            )
                        })
                        :
                        <div></div>
                    } */}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Dropdown
