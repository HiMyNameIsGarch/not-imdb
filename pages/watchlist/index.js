import Layout from 'components/Layout';
import MovieSection from 'components/MovieSection';
import useSWR from 'swr';

const Main = () => {
    const { data } = useSWR('/api/watchlist');

    if (!data) {
        return <h1 className="text-3xl text-center">Nothing to see here</h1>;
    }
    if (data.length < 1) {
        return <h1 className="text-3xl text-center">No movies in watchlist</h1>;
    }
    return <MovieSection data={data} title="Here is your watchlist" />;
};

export default function WatchList() {
    return (
        <Layout title="Watch List">
            <Main />
        </Layout>
    );
}
