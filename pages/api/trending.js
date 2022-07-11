import { fetcher, getTrending } from 'utils/api';

const trendingOpts = ['week', 'day'];

export default async function handler(req, res) {
    const { time } = req.query;
    if (!trendingOpts.includes(time)) {
        res.status(400).json('Invalid arguments, try', trendingOpts);
        return;
    }

    const trending = await fetcher(getTrending(time));
    res.status(200).json(trending.results);
}
