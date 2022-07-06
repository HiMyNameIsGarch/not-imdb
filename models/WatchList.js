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

export default global.models.WatchList;
