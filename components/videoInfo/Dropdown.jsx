import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from '../../styles/videoInfo/Dropdown.module.css'
import { useEffect, useState } from 'react'

const Dropdown = ({season, episodes, id, seasonNumber}) => {
    // const [expanded, setExpanded] = useState([]);
    
    // const handleChange = (panel) => async (event, isExpanded) => {
    //     if (isExpanded === true) {
    //         let response = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`)
    //         let data = await response.json()
    //         console.log(data)
    //         if (expanded.[seasonNumber - 1] === undefined) {
    //             setExpanded(expanded + [seasonNumber, data.episodes])
    //         }
    //     }
    // };
    // console.log(expanded)

    // onChange={handleChange('panel1')}
    
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
                    <Typography>
                        Episode List
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Dropdown
