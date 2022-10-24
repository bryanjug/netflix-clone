import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Image from 'next/image'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import styles from '../styles/Nav.module.css'
import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieIcon from '@mui/icons-material/Movie';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Nav(props) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  let type = props.playSomething[0]
  let id = props.playSomething[1]

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={styles.container}>
        <div className={styles.sideBar}>
            <ul className={styles.listContainer}>
                <li>
                    <Link 
                        href="/" 
                        passHref
                    >
                        <HomeOutlinedIcon className={styles.icon}/>
                    </Link>
                </li>
                <li>
                    <Link
                        as={`/${type}/${id}`}
                        href="/[type]/[video]"
                        passHref
                    >
                        <ShuffleOutlinedIcon className={styles.icon}/>
                    </Link>
                </li>
                <li>
                    <Link 
                        href="/Popular"
                        passHref
                    >
                        <TrendingUpIcon className={styles.icon}/>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/TVShows"
                        passHref
                    >
                        <LiveTvIcon className={styles.icon}/>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/Movies"
                        passHref
                    >
                        <MovieIcon className={styles.icon}/>
                    </Link>
                </li>
            </ul>
        </div>
        <HideOnScroll {...props}>
            <AppBar className={styles.nav}>
                <Toolbar>
                    <IconButton 
                    edge="start" 
                    color="inherit" 
                    aria-label="menu" 
                    className={styles.menuButton}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                      {({ TransitionProps, placement }) => (
                        <Grow
                          className={styles.menuListContainer}
                          {...TransitionProps}
                          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className={styles.menuList}>
                                <Link 
                                  href="/" 
                                  passHref
                                >
                                  <MenuItem onClick={handleClose} className={styles.menuItem}>
                                    Home
                                  </MenuItem>
                                </Link>
                                <Link
                                  as={`/${type}/${id}`}
                                  href="/[type]/[video]"
                                  passHref
                                >
                                  <MenuItem onClick={handleClose} className={styles.menuItem}>Play Something</MenuItem>
                                </Link>
                                <Link 
                                  href="/Popular"
                                  passHref
                                >
                                  <MenuItem onClick={handleClose} className={styles.menuItem}>Popular</MenuItem>
                                </Link>
                                <Link
                                  href="/TVShows"
                                  passHref
                                >
                                  <MenuItem onClick={handleClose} className={styles.menuItem}>TV Shows</MenuItem>
                                </Link>
                                <Link
                                  href="/Movies"
                                  passHref
                                >
                                  <MenuItem onClick={handleClose} className={styles.menuItem}>Movies</MenuItem>
                                </Link>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                    <Link
                      href="/"
                      passHref
                    >
                      <Image src="/logo.png" alt="Netflix logo" width="64" height="20" className={styles.logo}/>
                    </Link>
                    <Link
                      href="/SearchBar"
                      passHref
                    >
                      <IconButton aria-label="search" color="inherit" className={styles.searchIcon}>
                        <SearchIcon />
                      </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    </div>
  );
}