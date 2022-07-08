import * as History from 'models/History';
import dbConnect from 'utils/dbConnect';

export default async function handler(_req, res) {
    await dbConnect();

    const movies = await History.GetAll();
    res.status(200).json(movies);
}
