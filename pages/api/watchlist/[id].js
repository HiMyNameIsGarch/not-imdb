import { fetcher } from 'utils/api';
import * as WatchList from 'models/WatchList';
import * as History from 'models/History';
import dbConnect from 'utils/dbConnect';
import { getMovieUrl } from 'utils/api';

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;
    const { id } = req.query;

    if (method === 'GET') {
        const watch = await WatchList.Get(id);
        if (watch) {
            res.status(200).json({ found: true });
        } else {
            res.status(404).json({ found: false });
        }
    } else if (method === 'PUT') {
        const historyMovie = await History.Get(id);

        if (historyMovie) {
            res.status(400).json({ msg: 'Movie already in history' });
            return;
        }

        const movie = await fetcher(getMovieUrl(id));
        await WatchList.Create({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
        });

        res.status(200).json(movie);
    } else if (method === 'DELETE') {
        await WatchList.Delete(id);
        res.status(200).end('Ok');
    }
    res.status(400).end();
}
