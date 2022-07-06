import Layout from '../components/Layout';
import useSWR from 'swr';
import MovieCard from '../components/MovieCard';

const Main = () => {
    const { data } = useSWR('/api/watchlist');
    if (!data) {
        return <h1 className="text-3xl text-center">Nothing to see here</h1>;
    }
    return (
        <div className="w-full max-w-7xl mx-auto px-8">
            <div className="flex items-stretch flex-col">
                <h1 className="text-4xl text-center mb-5">Watchlist baby</h1>
                <div className="grid grid-cols-3 gap-4">
                    {data.map(
                        ({
                            id,
                            title,
                            overview,
                            release_date,
                            vote_average,
                            vote_count,
                        }) => (
                            <MovieCard
                                key={id}
                                id={id}
                                title={title}
                                overview={overview}
                                release_date={release_date}
                                vote_average={vote_average}
                                vote_count={vote_count}
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
        <Layout title="History">
            <Main />
        </Layout>
    );
}
