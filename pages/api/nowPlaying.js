import { fetcher, getNowPlaying } from 'utils/api';

export default async function handler(_req, res) {
    const now = await fetcher(getNowPlaying());

    res.status(200).json(now.results);
}
