import Layout from '../components/Layout';

const Main = () => {
    return (
        <div className="flex justify-center align-middle h-full">
            <h1 className="text-3xl font-bold ">Here is your history blyat</h1>
        </div>
    );
};

export default function History() {
    return (
        <Layout title="History">
            <Main />
        </Layout>
    );
}
