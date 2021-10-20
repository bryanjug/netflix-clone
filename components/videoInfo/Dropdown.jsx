import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from '../../styles/videoInfo/Dropdown.module.css'

const Dropdown = ({season, episodes}) => {
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
                        Test
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
