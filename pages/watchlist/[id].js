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
    const { data: watch, error: watchError } = useSWR(
        id && `/api/watchlist/${id}`,
    );

    if (error || watchError)
        return (
            <ErrorMsg
                errorStr={`Error fetching movie with ID ${id}: ${JSON.stringify(
                    error,
                )}`}
            />
        );
    if (!watch) <ProgressBar />;
    return (
        <MoviePresentation data={data} hist={null}>
            <div className="my-3">
                <Textarea
                    title="Expectations"
                    placeholder="Expectations"
                    value={watch?.expectations || ''}
                    disabled
                />
            </div>
            <div className="my-3">
                <Textarea
                    title="Future References"
                    placeholder="Future references"
                    value={watch?.future_references || ''}
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
