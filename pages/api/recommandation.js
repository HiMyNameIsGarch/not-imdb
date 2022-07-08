import { fetcher, getPopular } from 'utils/api';

export default async function handler(_req, res) {
    const popular = await fetcher(getPopular());
    // sort
    popular.results.sort((a, b) => b.vote_average - a.vote_average);
    popular.results = popular.results.slice(0, 6);

    res.status(200).json(popular.results);
}
