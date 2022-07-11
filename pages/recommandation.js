import Layout from 'components/Layout';
import MovieSection from 'components/MovieSection';
import useSWR from 'swr';

const RecommendMe = () => {
    const { data: popular } = useSWR('/api/recommandation');
    const { data: watchlist } = useSWR('/api/watchlist');
    const { data: history } = useSWR('/api/history');
    if (!watchlist || !history || !popular) {
        return <h1 className="text-center">Data not found</h1>;
    }
    return (
        <div>
            <MovieSection title="Popular" data={popular} />
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
            <div className="w-full max-w-7xl mx-auto px-8">
                <div className="flex items-stretch flex-col">
                    <RecommendMe />
                </div>
            </div>
        </Layout>
    );
}
