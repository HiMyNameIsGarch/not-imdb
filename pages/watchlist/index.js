import Layout from 'components/Layout';
import MovieSection from 'components/MovieSection';
import useSWR from 'swr';
import DataNotFound from 'components/DataNotFound';

const Main = () => {
    const { data } = useSWR('/api/watchlist');

    if (!data) return <DataNotFound text="Nothing to see here" />;
    if (data.length < 1) return <DataNotFound text="No movies in watchlist" />;

    return (
        <MovieSection
            data={data}
            title="Here is your watchlist"
            baseLink="watchlist"
        />
    );
};

export default function WatchList() {
    return (
        <Layout title="Watch List">
            <Main />
        </Layout>
    );
}
