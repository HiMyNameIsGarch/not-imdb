import Layout from 'components/Layout';
import MovieSection from 'components/MovieSection';
import useSWR from 'swr';
import DataNotFound from 'components/DataNotFound';

const RecommendMe = () => {
    const { data: popular } = useSWR('/api/recommandation');
    const { data: watchlist } = useSWR('/api/watchlist');
    const { data: history } = useSWR('/api/history');

    if (!watchlist || !history || !popular) return <DataNotFound />;
    return (
        <div>
            <MovieSection title="Popular titles" data={popular} />
            <MovieSection
                title="Mmm, those movies stays here untouched..."
                data={watchlist}
            />
            <MovieSection title="Maybe a rewatch?" data={history} />
        </div>
    );
};

export default function Recommandations() {
    return (
        <Layout title="What to watch">
            <div className="flex items-stretch flex-col">
                <RecommendMe />
            </div>
        </Layout>
    );
}
