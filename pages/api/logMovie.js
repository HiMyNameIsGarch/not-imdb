import { fetcher, getSearchMovieUrl } from 'utils/api';

export default async function handler(req, res) {
    const results = await fetcher(getSearchMovieUrl(req.query.terms));

    res.status(200).json(results);
}
