import Layout from 'components/Layout';
import MovieSection from 'components/MovieSection';
import useSWR from 'swr';

const Main = () => {
    const { data } = useSWR('/api/watchlist');

    if (!data) return <DataNotFound text="Nothing to see here" />;
    if (data.length < 1) return <DataNotFound text="No movies in history" />;

    return <MovieSection data={data} title="Here is your watchlist" />;
};

export default function WatchList() {
    return (
        <Layout title="Watch List">
            <Main />
        </Layout>
    );
}
