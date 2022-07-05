export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const swrOptions = {
    fetcher,
};

export const buildImageUrl = (path, size = 'original') =>
    `https://image.tmdb.org/t/p/${size}${path}`;

export const getMovieUrl = (id) =>
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;
