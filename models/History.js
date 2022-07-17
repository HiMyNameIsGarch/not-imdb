import mongoose from 'mongoose';

global.models = global.models || {};

global.models.History =
    global.models.History ||
    mongoose.model('History', {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        release_date: { type: Date, required: true },
        poster_path: { type: String, required: true },
        date: { type: Date, default: Date.now },
        enter_count: { type: Number, default: 0 },

        mark: { type: Number, required: true },
        expectations: { type: String },
        review: { type: String },
        review_template: { type: String },
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
    const movie = await History.findOne({ id });
    if (!movie) return null;

    movie.enter_count = movie.enter_count + 1;
    await History.updateOne(
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
    return await History.deleteOne({ id });
};
