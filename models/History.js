import mongoose from 'mongoose';

global.models = global.models || {};

global.models.History =
    global.models.History ||
    mongoose.model('History', {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        overview: { type: String, required: true },
        release_date: { type: Date, required: true },
        vote_average: { type: Number, required: true },
        vote_count: { type: Number, required: true },
        date: { type: Date, default: Date.now },
    });

const History = global.models.History;

// Methods
export const Create = async (model) => {
    const history = new History(model);
    await history.save();
};

export const GetAll = async () => {
    return await History.find();
};

export const Get = async (id) => {
    return await History.findOne({ id });
};

export const Delete = async (id) => {
    return await History.deleteOne({ id });
};
