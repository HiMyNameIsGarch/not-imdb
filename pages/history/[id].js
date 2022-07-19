import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from 'components/Layout';
import Textarea from 'components/Textarea';
import MoviePresentation from 'components/MoviePresentation';
import ErrorMsg from 'components/ErrorMsg';
import ProgressBar from 'components/ProgressBar';

const MovieContent = () => {
    const { id } = useRouter().query;
    const { data, error } = useSWR(id && `/api/movies/${id}`);
    const { data: history, histError } = useSWR(id && `/api/history/${id}`);
    if (error || histError) {
        return (
            <ErrorMsg
                errorStr={`Error fetching movie with ID ${id}: ${JSON.stringify(
                    error,
                )}`}
            />
        );
    }
    if (!history) <ProgressBar />;

    return (
        <MoviePresentation data={data} hist={'nobtnbtw'}>
            <div className="my-3">
                <h1 className="text-3xl">This film is a {history.mark}!</h1>
            </div>
            <div className="my-3">
                <Textarea
                    title="My expectations were"
                    placeholder="expectations"
                    value={history.expectations}
                    disabled
                />
            </div>
            <div className="my-3">
                <Textarea
                    title="My review"
                    placeholder="review"
                    value={history.review}
                    disabled
                />
            </div>
        </MoviePresentation>
    );
};

export default function Movie() {
    return (
        <Layout>
            <MovieContent />
        </Layout>
    );
}
