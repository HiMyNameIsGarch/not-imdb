import Layout from 'components/Layout';
import useSWR from 'swr';
import MovieCard from 'components/MovieCard';

const RenderCard = ({ title, data }) => {
    return (
        <div>
            <h1 className="text-4xl text-center my-5">{title}</h1>;
            <div className="grid grid-cols-3 gap-4 my-3">
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
    );
};
const RecommendMe = () => {
    const { data: popular } = useSWR('/api/recommandation');
    const { data: watchlist } = useSWR('/api/watchlist');
    const { data: history } = useSWR('/api/history');
    if (!watchlist || !history || !popular) {
        return <h1>Data not found</h1>;
    }
    return (
        <div className="w-full max-w-7xl mx-auto px-8">
            <div className="flex items-stretch flex-col">
                <RenderCard title="Popular" data={popular} />
                <RenderCard
                    title="Mmm, those movies stays here untouched..."
                    data={watchlist}
                />
                <RenderCard title="Maybe a rewatch?" data={history} />
            </div>
        </div>
    );
};

export default function Recommandations() {
    return (
        <Layout title="What to watch">
            <RecommendMe />
        </Layout>
    );
}
