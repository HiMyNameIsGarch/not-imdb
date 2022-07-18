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
        if (history === null) {
            res.status(404).json(history);
            return;
        }
        res.status(200).json(history);
    } else if (method === 'PUT') {
        const movie = await fetcher(getMovieUrl(id));

        const { body } = req;
        await History.Create({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            date: movie.date,
            enter_count: 1,

            mark: body.mark,
            expectations: body.expectations,
            review: body.review,
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
