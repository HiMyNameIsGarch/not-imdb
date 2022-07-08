import { fetcher } from 'utils/api';
import * as History from 'models/History';
import * as WatchList from 'models/WatchList';
import dbConnect from 'utils/dbConnect';
import { getMovieUrl } from 'utils/api';

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;
    const { id } = req.query;

    if (method === 'GET') {
        const history = await History.Get(id);

        if (history) {
            res.status(200).json({ found: true });
        } else {
            res.status(404).json({ found: false });
        }
    } else if (method === 'PUT') {
        const movie = await fetcher(getMovieUrl(id));

        await History.Create({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            date: movie.date,
        });

        const watchMovie = await WatchList.Get(id);
        if (watchMovie) {
            await WatchList.Delete(id);
        }

        res.status(200).json(movie);
    } else if (method === 'DELETE') {
        await History.Delete(id);
        res.status(200).json({ msg: 'Ok' });
    }
    res.status(400).end();
}
