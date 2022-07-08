import mongoose from 'mongoose';

global.models = global.models || {};

global.models.WatchList =
    global.models.WatchList ||
    mongoose.model('WatchList', {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        overview: { type: String, required: true },
        release_date: { type: Date, required: true },
        vote_average: { type: Number, required: true },
        vote_count: { type: Number, required: true },
        date: { type: Date, default: Date.now },
    });

const WatchList = global.models.WatchList;

// Methods
export const Create = async (model) => {
    const history = new WatchList(model);
    await history.save();
};

export const GetAll = async () => {
    return await WatchList.find();
};

export const Get = async (id) => {
    return await WatchList.findOne({ id });
};

export const Delete = async (id) => {
    return await WatchList.deleteOne({ id });
};
