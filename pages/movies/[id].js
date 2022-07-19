import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from 'components/Layout';
import MoviePresentation from 'components/MoviePresentation';
import ErrorMsg from 'components/ErrorMsg';

const MovieContent = () => {
    const { id } = useRouter().query;
    const { data, error } = useSWR(id && `/api/movies/${id}`);
    const { data: hist } = useSWR(id && `/api/history/${id}`);

    if (error)
        return (
            <ErrorMsg
                errorStr={`Error fetching movie with ID ${id}: ${JSON.stringify(
                    error,
                )}`}
            />
        );

    return <MoviePresentation data={data} hist={hist} />;
};

export default function Movie() {
    return (
        <Layout>
            <MovieContent />
        </Layout>
    );
}
