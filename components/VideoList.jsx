import VideoItem from './VideoItem'

const VideoList = ({trending}) => {
    let results = trending.results;
    console.log(results)
    //https://image.tmdb.org/t/p/w500/kb4s0ML0iVZlG6wAKbbs9NAm6X.jpg
    return (
        <div>
            {
                results.map((result) => (<p>{result.original_title}</p>))
            }
            <VideoItem src="https://image.tmdb.org/t/p/w500/kb4s0ML0iVZlG6wAKbbs9NAm6X.jpg" />
        </div>
    )
}

export default VideoList
