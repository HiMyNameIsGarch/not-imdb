import Layout from 'components/Layout';
import useSWR from 'swr';
import MovieSection from 'components/MovieSection';
import DataNotFound from 'components/DataNotFound';

const TrendingDay = () => {
    const { data } = useSWR('/api/trending?time=day');
    if (!data) return <DataNotFound />;
    return <MovieSection title="Trending this day" data={data} />;
};

const TrendingWeek = () => {
    const { data } = useSWR('/api/trending?time=week');
    if (!data) return <DataNotFound />;
    return <MovieSection title="Treding this week" data={data} />;
};

const Upcoming = () => {
    const { data } = useSWR('/api/upcoming');
    if (!data) return <DataNotFound />;
    return <MovieSection title="Upcoming" data={data} />;
};

const NowPlaying = () => {
    const { data } = useSWR('/api/nowPlaying');
    if (!data) return <DataNotFound />;
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
