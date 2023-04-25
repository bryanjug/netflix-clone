import Meta from '../Meta'
import NavInfo from './NavInfo'
import styles from '../../styles/videoInfo/VideoInfo.module.css'
import Chip from '@mui/material/Chip'
import {useState, useEffect} from 'react'
import Image from 'next/image'
import Dropdown from '../../components/videoInfo/Dropdown'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import GradeIcon from '@mui/icons-material/Grade';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import underline from '/public/underline.png'
import VideoCarousel from '../VideoCarousel';

const VideoInfo = ({id, info, type, companies, countries, videos, seasons}) => {
    const [seasonsAndEpisodes, setSeasonsAndEpisodes] = useState();
    const [copyButtonText, setCopyButtonText] = useState("Share")
    const [copyButtonColor, setCopyButtonColor] = useState(styles.shareButton)
    const [stars, setStars] = useState([]);
    const [longTextStyle, setLongTextStyle] = useState(styles.longText);
    let backdropPath = `https://image.tmdb.org/t/p/original${info.backdrop_path}`;
    let classes = 'sectionTitle firstTitle';
    const [underlineLength, setUnderlineLength] = useState("45");
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [videosImageWidth, setVideosImageWidth] = useState("300");

    function Copy() {
        navigator.clipboard.writeText(window.location.href);
        setCopyButtonText("Copied!")
        setCopyButtonColor(styles.shareButtonGreen)
        const myTimeout = setTimeout(changeColor, 3000);
        function changeColor() {
            setCopyButtonText("Share")
            setCopyButtonColor(styles.shareButton)
            clearTimeout(myTimeout);
        }
    }

    useEffect(() => {
        async function FetchEpisodesData() {
            if (seasons.length !== 0) {
                let i;
                let list = [];
                for (i = 0; i < seasons.length; i++) {
                    let season = {};
                    let response = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasons[i].season_number}?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}&include_adult=false`)
                    let data = await response.json()
                    season = seasons[i];
                    season.episodes = data.episodes;
                    list.push({season: season})
                }
                setSeasonsAndEpisodes(list)
            }
        }
        FetchEpisodesData()
    }, [seasons.length])

    useEffect(() => {
        if (info.vote_average > 0) {
            let i;
            for (i = 0; i < info.vote_average.toFixed(); i++) {
                setStars(stars => [...stars,<GradeIcon className={styles.stars} key={i} />] );
            }
        }
    }, [info.vote_average])  

    useEffect(() => {
        if (width === 1024) {
            setUnderlineLength("60")
        }
        if (width === 1440) {
            setUnderlineLength("75")
            setVideosImageWidth("400")
        }
    }, [width])

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return (
        <div>
            <Meta 
                title="Netflix" 
                description="Watch your favorite TV shows and movies on one platform."
                keywords="Netflix, television, shows, online, watch, new, favorites, movies"
            />
            <main className={styles.container}>
                <NavInfo /> 
                <div className={styles.firstImageContainer}>
                    {
                        info.backdrop_path ?
                        <div className={styles.firstImage} style={{backgroundImage: `url(${backdropPath})`}}>
                            <div className={styles.imageCover}>
                                <h2 className={styles.title}>
                                {
                                    info.title ? info.title
                                    : info.name ? info.name 
                                    : info.original_name ? info.original_name
                                    :
                                    null
                                }
                                &nbsp;{
                                    info.release_date ?
                                    `(${info.release_date.slice(0, 4)})`
                                    :
                                    null
                                }
                                </h2>
                                <p className={styles.tagline}>
                                    {
                                        info.tagline ? info.tagline
                                        :
                                        null
                                    }
                                </p>
                                <div className={styles.starsContainer}>
                                    {stars}
                                </div>
                            </div>
                            
                        </div>
                        :
                        <div className={styles.missingImage}></div>
                    }
                </div>
                <div className={styles.firstSection}>
                    {/* `${styles.projects-pd-text} ${styles.projects-pd-subdetail}` */}
                    <p className={`${styles.sectionTitle} ${styles.firstTitle}`}>Overview:</p>
                    <Image 
                        alt=""
                        src={underline}
                        width={underlineLength}
                        height="4"
                        layout="intrinsic"
                        className={styles.underline}
                    />
                    {
                        info.overview ?
                        <p className={styles.longText}>
                            {info.overview}
                        </p>
                        :
                        <p className={styles.longText}>
                            N/A
                        </p>
                    }
                    <div className={styles.buttons}>
                        <a href={info.homepage} target="_blank" rel="noreferrer" className={styles.playButtonContainer}>
                            <button className={styles.playButton}>
                                <PlayArrowIcon className={styles.playArrow} />
                                <span className={styles.playButtonText}>PLAY</span> 
                            </button>
                        </a>
                        <Button className={copyButtonColor} onClick={Copy} variant="contained" color="primary" endIcon={<ContentCopyIcon />}>
                            {copyButtonText}
                        </Button>
                    </div>
                </div>
                <div className={styles.statsGroupContainer}>
                    <div className={styles.statsContainer}>
                        <p className={styles.statsTitle}>Rating</p>
                        {
                            info.vote_average ?
                            <p>{info.vote_average.toFixed(1)}</p>
                            :
                            <div>
                                <p>0</p>
                            </div>
                        }
                    </div>
                    <div className={styles.statsContainer2}>
                        <p className={styles.statsTitle}>Adult</p>
                        {
                            info.adult === false ?
                            <div>
                                <p className={styles.notAdult}>TV-MA</p>
                            </div>
                            :
                            info.adult === true ?
                            <div>
                                <p>TV-MA</p>
                            </div>
                            :
                            <div>
                                <p>N/A</p>
                            </div>
                        }
                    </div>
                    <div className={styles.statsContainer3}>        
                        <p className={styles.statsTitle}>Release Date</p>            
                        {
                            info.release_date ?
                            <div>
                                <p>{info.release_date}</p>
                            </div>
                            :
                            <div>
                                <p>N/A</p>
                            </div>
                        }
                    </div>
                    <div className={`${styles.statsContainer4}`}>
                        <p className={styles.statsTitle}>Vote Count</p>
                        {
                            info.vote_count ? 
                            <div>
                                <p>{info.vote_count}</p>
                            </div>
                            :
                            <div>
                                <p>0</p>
                            </div>
                        }
                    </div>
                    <div className={styles.statsContainer5}>
                        <p className={styles.statsTitle}>Revenue</p>
                        {
                            info.revenue ?
                            <div>
                                <p>${info.revenue}</p>
                            </div>
                            :
                            <div>
                                <p>$0</p>
                            </div>
                        }
                    </div>
                    <div className={styles.statsContainer6}>
                        <p className={styles.statsTitle}>Budget</p>
                        {
                            info.budget ?
                            <div>
                                <p>${info.budget}</p>
                            </div>
                            :
                            <div>
                                <p>$0</p>
                            </div>
                        }
                    </div>   
                </div>      
                <div className={styles.splitter}>

                </div>
                <div className={styles.genresContainer}>
                    <p className={`${styles.sectionTitle} ${styles.genresTitle}`}>Genres:</p>
                    <div className={styles.underlineContainer}>
                        <Image 
                            alt=""
                            src={underline}
                            width={underlineLength}
                            height="4"
                            layout="intrinsic"
                            className={styles.underline}
                        />
                    </div>

                    <div className={styles.chipsContainer}>
                        {
                            info.genres ? 
                            info.genres.map(function(result, index) {
                                return (
                                    <Chip key={index} label={result.name} className={styles.chip} />
                                )
                            })
                            :
                            null
                        }
                    </div>
                </div>
                <div className={styles.productionCompaniesContainer}>
                    <p className={styles.sectionTitle}>Production Companies: </p> 
                    <Image 
                            alt=""
                            src={underline}
                            width={underlineLength}
                            height="4"
                            layout="intrinsic"
                            className={styles.underline}
                    />
                    <div className={styles.chipsContainer}>
                        {
                            companies ? 
                            companies.map(function(result, index) { 
                                return <Chip key={index} label={result.name} className={styles.chip} />
                            })
                            :
                            null
                        }
                    </div>
                </div>
                <div className={styles.productionCountriesContainer}>
                    <p className={styles.sectionTitle}>Production Countries: </p> 
                    <Image 
                        alt=""
                        src={underline}
                        width={underlineLength}
                        height="4"
                        layout="intrinsic"
                        className={styles.underline}
                    />
                    <div className={styles.chipsContainer}>
                    
                        {
                            countries ?
                            countries.map(function(result, index) {
                                return <Chip key={index} label={result.name} className={styles.chip} />
                            })
                            : 
                            null
                        }
                    </div>
                </div>
                {
                    videos.length !== 0 ? 
                    <div>
                        <p className={styles.sectionTitle + ' ' + styles.videosTitle}>Videos<span className={styles.colon}>:</span></p>
                        <Image 
                            alt=""
                            src={underline}
                            width={underlineLength}
                            height="4"
                            layout="intrinsic"
                            className={styles.underline + ' ' + styles.videosUnderline}
                        />
                        <VideoCarousel videos={videos} />
                    </div>
                    :
                    null
                }
                
                {
                    seasonsAndEpisodes && seasons.length !== 0 ?
                    <div>
                        <p className={styles.sectionTitle  + ' ' + styles.seasonsTitle}>Seasons<span className={styles.colon}>:</span></p>
                        <Image 
                            alt=""
                            src={underline}
                            width={underlineLength}
                            height="4"
                            layout="intrinsic"
                            className={styles.underline + ' ' + styles.seasonsUnderline}
                        />
                        <div className={styles.spacer}>

                        </div>
                    </div>
                    :
                    null
                }
                <div className={styles.dropdownContainer}>
                    {
                        seasonsAndEpisodes && seasons.length !== 0 ?
                        seasonsAndEpisodes.map(function(result, index) {
                            return (
                                <div key={index} >
                                    {
                                        result.season.episodes.length !== 0 ?
                                        <Dropdown 
                                            season={result.season.name} 
                                            id={result.season.id} seasonNumber={result.season.season_number} 
                                            episodes={result.season.episodes} 
                                        />  
                                        :
                                        null
                                    }
                                </div>
                            );
                        })
                        :
                        null
                    }
                </div>
            </main>
        </div>
    )
}

export default VideoInfo