import Layout from '../components/Layout';

const WatchMe = () => {
    return (
        <div className="flex justify-center align-middle h-full">
            <h1 className="text-3xl font-bold ">Watch me daddy!</h1>
        </div>
    );
};

export default function WatchList() {
    return (
        <Layout title="Watch List">
            <WatchMe />
        </Layout>
    );
}
