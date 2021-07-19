import {useState} from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import styles from '../styles/Nav.module.css'

const Nav = () => {
    const [value, setValue] = useState('recents');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    return (
        <BottomNavigation value={value} onChange={handleChange} className={styles.container}>
            <BottomNavigationAction label="Search" value="search" icon={<SearchIcon className={styles.icon}/>} className={styles.text}/>
            <BottomNavigationAction label="Home" value="home" icon={<HomeOutlinedIcon className={styles.icon}/>} className={styles.text}/>
            <BottomNavigationAction label="Shuffle" value="shuffle" icon={<ShuffleIcon className={styles.icon}/>} className={styles.text}/>
            <BottomNavigationAction label="Trending" value="trending" icon={<TrendingUpIcon className={styles.icon}/>} className={styles.text}/>
        </BottomNavigation>
    )
}

export default Nav