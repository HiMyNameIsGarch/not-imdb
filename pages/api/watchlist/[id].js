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

        const history = new WatchList({ id, title: movie.title });
        await history.save();

        res.status(200).json(movie);
    } else if (method === 'DELETE') {
        await WatchList.deleteOne({ id });
        res.status(200).end('Ok');
    }
    res.status(400).end();
}
