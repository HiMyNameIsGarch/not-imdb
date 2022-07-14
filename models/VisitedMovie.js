import mongoose from 'mongoose';

global.models = global.models || {};

global.models.VisitedMovie =
    global.models.VisitedMovie ||
    mongoose.model('VisitedMovie', {
        movieId: { type: Number, required: true },
        visit_count: { type: Number, default: 1 },
        first_visit: { type: Date, default: Date.now },
        last_visited: { type: Date, required: true },
    });

const VisitedMovie = global.models.VisitedMovie;

export const Log = async (movieId) => {
    const movie = await VisitedMovie.findOne({ movieId });
    if (!movie) {
        const visited = new VisitedMovie({
            movieId: movieId,
            visit_count: 1,
            last_visited: Date.now,
        });
        await visited.save();
    } else {
        movie.visit_count = movie.visit_count + 1;
        await VisitedMovie.updateOne(
            { movieId: movieId },
            {
                $set: {
                    visit_count: movie.visit_count,
                    last_visited: Date.now,
                },
            },
        );
    }
};

export const GetAll = async () => {
    const movies = await VisitedMovie.find().sort({ visit_count: -1 });
    return movies;
};
