import { fetcher, getUpcoming } from 'utils/api';

export default async function handler(_req, res) {
    const upcoming = await fetcher(getUpcoming());

    res.status(200).json(upcoming.results);
}
