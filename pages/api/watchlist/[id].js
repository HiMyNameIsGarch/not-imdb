import { fetcher } from '../../../utils/api';
import WatchList from '../../../models/WatchList';
import dbConnect from '../../../utils/dbConnect';
import { getMovieUrl } from '../../../utils/api';

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;
    const { id } = req.query;

    if (method === 'GET') {
        const watch = await WatchList.findOne({ id });
        if (watch) {
            res.status(200).json({ found: true });
        } else {
            res.status(404).json({ found: false });
        }
    } else if (method === 'PUT') {
        const movie = await fetcher(getMovieUrl(id));

        const movieModel = new WatchList({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            date: movie.date,
        });
        await movieModel.save();

        res.status(200).json(movie);
    } else if (method === 'DELETE') {
        await WatchList.deleteOne({ id });
        res.status(200).end('Ok');
    }
    res.status(400).end();
}
