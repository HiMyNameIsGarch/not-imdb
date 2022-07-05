import Layout from '../components/Layout';

const RecommendMe = () => {
    return (
        <div className="flex justify-center align-middle h-full">
            <h1 className="text-3xl font-bold">
                This is where all data collection happens
            </h1>
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
