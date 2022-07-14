import { fetcher } from 'utils/api';
import { getMovieUrl } from 'utils/api';
import * as VisitedMovie from 'models/VisitedMovie';
import dbConnect from 'utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();
    const movie = await fetcher(getMovieUrl(req.query.id));

    res.status(200).json(movie);
    VisitedMovie.Log(movie.id);
}
