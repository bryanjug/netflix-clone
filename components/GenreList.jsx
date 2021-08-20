import VideoList from './VideoList'

const GenreList = ({genreList}) => {
    genreList = genreList.results;
    return (
        <div>
            {
                genreList.map((result) => (
                    <VideoList 
                    
                    />
                ))
            }
        </div>
    )
}

export default GenreList
