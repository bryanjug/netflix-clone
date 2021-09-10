import {useRouter} from 'next/router'

export default function Video() {
    const router = useRouter();

    console.log(router.query);
    return <h2>{router.query.video}</h2>
}