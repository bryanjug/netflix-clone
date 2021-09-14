import Nav from './Nav'
import Meta from '../components/Meta'
import NavInfo from './NavInfo'

const VideoInfo = ({video}) => {
    return (
        <div>
            <Meta 
                title="Netflix" 
                description="Watch your favorite TV shows and movies on one platform."
                keywords="Netflix, television, shows, online, watch, new, favorites, movies"
            />
            <main>
                <NavInfo />
                <h2>
                    {video}
                </h2>
            </main>
        </div>
    )
}

export default VideoInfo
