import mongoose from 'mongoose';

global.models = global.models || {};

global.models.WatchList =
    global.models.WatchList ||
    mongoose.model('WatchList', {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        release_date: { type: Date, required: true },
        poster_path: { type: String, required: true },
        enter_count: { type: Number, default: 0 },
        date: { type: Date, default: Date.now },
        impressions: { type: String },
    });

const WatchList = global.models.WatchList;

// Methods
export const Create = async (model) => {
    const history = new WatchList(model);
    await history.save();
};

export const GetAll = async () => {
    const movies = await WatchList.find().sort({ enter_count: -1 });
    return movies;
};

export const Get = async (id) => {
    const movie = await WatchList.findOne({ id });
    if (!movie) return null;

    movie.enter_count = movie.enter_count + 1;
    await WatchList.updateOne(
        { id: id },
        {
            $set: {
                enter_count: movie.enter_count,
            },
        },
    );
    return movie;
};

export const Delete = async (id) => {
    return await WatchList.deleteOne({ id });
};
