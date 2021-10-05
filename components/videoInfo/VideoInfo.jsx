import Meta from '../Meta'
import NavInfo from './NavInfo'
import YoutubePlayer from './YoutubePlayer'

const VideoInfo = ({id, videoId, info}) => {
    return (
        <div>
            <Meta 
                title="Netflix" 
                description="Watch your favorite TV shows and movies on one platform."
                keywords="Netflix, television, shows, online, watch, new, favorites, movies"
            />
            <main>
                <NavInfo /> 
                <YoutubePlayer videoId={videoId} />
                <h1>
                    Title
                </h1>
                <p>2021</p>
                <p>TV-MA</p>
                <p>Limited Series</p>
                <p>HD</p>
                <p>#4 in the U.S. Today</p>
                <button>Play</button>
                <button>Where To Watch</button>
                <p>Movie info</p>
                <small>Starring: ...</small>
                <small>Creator: ...</small>
                <button>My List</button>
                <button>Rate</button>
                <button>Share</button>
                <button>EPISODES</button>
                <button>TRAILERS & MORE</button>
                <button>MORE LIKE THIS</button>
            </main>
        </div>
    )
}

export default VideoInfo