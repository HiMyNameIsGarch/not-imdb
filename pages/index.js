import Layout from 'components/Layout';
import useSWR from 'swr';
import MovieSection from 'components/MovieSection';

const TrendingDay = () => {
    const { data } = useSWR('/api/trending?time=day');
    if (!data) {
        return <h1 className="text-center">Data not found</h1>;
    }
    return <MovieSection title="Trending this day" data={data} />;
};

const TrendingWeek = () => {
    const { data } = useSWR('/api/trending?time=week');
    if (!data) {
        return <h1 className="text-center">Data not found</h1>;
    }
    return <MovieSection title="Treding this week" data={data} />;
};

const Upcoming = () => {
    const { data } = useSWR('/api/upcoming');
    if (!data) {
        return <h1 className="text-center">Data not found</h1>;
    }
    return <MovieSection title="Upcoming" data={data} />;
};

const NowPlaying = () => {
    const { data } = useSWR('/api/nowPlaying');
    if (!data) {
        return <h1 className="text-center">Data not found</h1>;
    }
    return <MovieSection title="What is playing right now?" data={data} />;
};

export default function Home() {
    return (
        <Layout title="Moviebase">
            <div className="flex items-stretch flex-col">
                <NowPlaying />
                <Upcoming />
                <TrendingWeek />
                <TrendingDay />
            </div>
        </Layout>
    );
}
