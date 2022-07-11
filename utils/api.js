export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const swrOptions = {
    fetcher,
};

const getApiUrl = (path) =>
    `https://api.themoviedb.org/3/${path}?api_key=${process.env.TMDB_API_KEY}`;

export const getTrending = (time) => getApiUrl(`/trending/movie/${time}`);

export const getNowPlaying = () => getApiUrl('movie/now_playing');

export const getUpcoming = () => getApiUrl('movie/upcoming');

export const getLatest = () => getApiUrl('movie/latest');

export const getPopular = () => getApiUrl('movie/popular');

export const getMovieUrl = (id) => getApiUrl(`movie/${id}`);

export const getRecommandationFromMovie = (id) =>
    getApiUrl(`movie/${id}/recommendations`);

export const buildImageUrl = (path, size = 'original') =>
    `https://image.tmdb.org/t/p/${size}${path}`;
