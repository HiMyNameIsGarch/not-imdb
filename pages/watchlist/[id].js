import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import { buildImageUrl } from 'utils/api';
import Layout from 'components/Layout';
import HistoryButton from 'components/HistoryButton';
import WatchListButton from 'components/WatchListButton';
import Textarea from 'components/Textarea';

const Badge = ({ children }) => {
    return (
        <span className="inline-block border-2 border-solid border-pink-500 rounded-xl mr-2 text-xs font-semibold p-[0.3rem]">
            {children}
        </span>
    );
};
const MovieContent = () => {
    const { id } = useRouter().query;
    const { data, error } = useSWR(id && `/api/movies/${id}`);

    if (error) {
        return (
            <h1 className="bg-red-500">
                Error fetching movie with ID {id}: {JSON.stringify(error)}
            </h1>
        );
    }
    if (!data) {
        return <h1>In progress...</h1>;
    }
    const title = data.title;
    if (data.tagline) {
        title = title + ' - ' + data.tagline;
    }
    return (
        <div className="grid grid-cols-12 gap-4">
            <Head>
                <title>{data.title}</title>
            </Head>
            <div className="col-span-3">
                <div className="min-w-[300px] relative">
                    <img
                        className="object-contain unoptimized"
                        src={buildImageUrl(data.poster_path, 'w300')}
                        alt="Movie Clip"
                        width="300"
                        height="450"
                    />
                </div>
            </div>
            <div className="col-span-9">
                <div className="grid grid-cols-2 mb-2">
                    <h1 className="col-span-1 text-3xl font-bold float-left">
                        {title}
                    </h1>
                    <div className="col-span-1">
                        <h1
                            className={`float-right border-pink-500 rounded-xl border-solid p-[0.3rem] text-sm ${
                                data.release_date ? 'border-2' : 'border-0'
                            }`}
                        >
                            {data.release_date}
                        </h1>
                    </div>
                </div>
                <div>
                    {data.genres?.map((genre) => (
                        <Badge key={genre.id}>{genre.name}</Badge>
                    ))}
                </div>
                <div className="my-3">
                    <h1 className="text-base">{data.overview}</h1>
                </div>
                <HistoryButton />
                <WatchListButton />
                <div className="my-3">
                    <Textarea
                        title="Expectations"
                        placeholder="Future references"
                        disabled
                    />
                </div>
                <div className="my-3">
                    <Textarea
                        title="Future References"
                        placeholder="Future references"
                        disabled
                    />
                </div>
            </div>
        </div>
    );
};

export default function Movie() {
    return (
        <Layout>
            <div className="h-full w-full max-w-7xl mx-auto">
                <MovieContent />
            </div>
        </Layout>
    );
}
