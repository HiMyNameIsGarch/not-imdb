import Layout from 'components/Layout';
import useSWR from 'swr';
import MovieCard from 'components/MovieCard';

const Main = () => {
    const { data } = useSWR('/api/watchlist');

    if (!data) {
        return <h1 className="text-3xl text-center">Nothing to see here</h1>;
    }
    if (data.length < 1) {
        return <h1 className="text-3xl text-center">No movies in watchlist</h1>;
    }
    return (
        <div className="w-full max-w-7xl mx-auto px-8">
            <div className="flex items-stretch flex-col">
                <h1 className="text-4xl text-center mb-5">
                    Here is your watchlist
                </h1>
                <div className="grid grid-cols-3 gap-4">
                    {data.map(
                        ({
                            id,
                            title,
                            release_date,
                            poster_path,
                            genre_ids,
                        }) => (
                            <MovieCard
                                key={id}
                                id={id}
                                title={title}
                                release_date={release_date}
                                poster={poster_path}
                                genres={genre_ids}
                            />
                        ),
                    )}
                </div>
            </div>
        </div>
    );
};

export default function WatchList() {
    return (
        <Layout title="Watch List">
            <Main />
        </Layout>
    );
}
