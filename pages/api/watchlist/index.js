import WatchList from '../../../models/WatchList';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(_req, res) {
    await dbConnect();

    const movies = await WatchList.find();
    res.status(200).json(movies);
}
