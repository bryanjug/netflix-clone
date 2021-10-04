import Meta from '../Meta'
import NavInfo from './NavInfo'
import VideoPlayer from './VideoPlayer'

const VideoInfo = ({id, videoId}) => {
    return (
        <div>
            <Meta 
                title="Netflix" 
                description="Watch your favorite TV shows and movies on one platform."
                keywords="Netflix, television, shows, online, watch, new, favorites, movies"
            />
            <main>
                <NavInfo /> 
                <VideoPlayer videoId={videoId} />
                <h2>
                    {id}
                </h2>
            </main>
        </div>
    )
}

export default VideoInfo