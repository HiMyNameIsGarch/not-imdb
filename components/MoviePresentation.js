import HistoryButton from 'components/HistoryButton';
import WatchListButton from 'components/WatchListButton';
import Badge from 'components/Badge';
import { buildImageUrl } from 'utils/api';
import Head from 'next/head';
import ProgressBar from 'components/ProgressBar';

const MoviePresentation = ({ data, hist, children }) => {
    if (!data) return <ProgressBar />;

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
                        className="object-contain unoptimized rounded-lg border-pink-600 border-2"
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
                {!hist ? <WatchListButton /> : <div />}
                {children}
            </div>
        </div>
    );
};
export default MoviePresentation;
