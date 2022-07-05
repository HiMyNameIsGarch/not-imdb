import { fetcher } from '../../../utils/api';
import { getMovieUrl } from '../../../utils/api';

export default async function handler(req, res) {
    const movie = await fetcher(getMovieUrl(req.query.id));

    res.status(200).json(movie);
}
