import DataNotFound from 'components/DataNotFound';
import Layout from 'components/Layout';
import MovieSection from 'components/MovieSection';
import useSWR from 'swr';

const Main = () => {
    const { data } = useSWR('/api/history');

    if (!data) return <DataNotFound text="Nothing to see here" />;
    if (data.length < 1) return <DataNotFound text="No movies in history" />;

    return (
        <MovieSection
            data={data}
            title="Films that you watched"
            baseLink="history"
        />
    );
};

export default function History() {
    return (
        <Layout title="History">
            <Main />
        </Layout>
    );
}
