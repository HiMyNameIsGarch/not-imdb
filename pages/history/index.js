import Layout from 'components/Layout';
import MovieSection from 'components/MovieSection';
import useSWR from 'swr';

const Main = () => {
    const { data } = useSWR('/api/history');
    if (!data) {
        return <h1 className="text-3xl text-center">Nothing to see here</h1>;
    }
    if (data.length < 1) {
        return <h1 className="text-3xl text-center">No movies in history</h1>;
    }
    return <MovieSection data={data} title="Films that you watched" />;
};

export default function History() {
    return (
        <Layout title="History">
            <Main />
        </Layout>
    );
}
