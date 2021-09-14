import {useRouter} from 'next/router'
import VideoInfo from '../components/VideoInfo'

export default function Video() {
    const router = useRouter();

    console.log(router.query);
    return (
        <VideoInfo video={router.query.video}/>
    );
}