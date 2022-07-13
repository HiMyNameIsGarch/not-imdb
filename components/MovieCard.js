import Link from 'next/link';
import { buildImageUrl } from 'utils/api';

export default function MovieCard({
    id,
    title,
    overview,
    release_date,
    vote_average,
    vote_count,
    poster,
}) {
    console.log(id);
    console.log(title);
    console.log(overview);
    console.log(release_date);
    console.log(vote_average);
    console.log(vote_count);
    const posterPath = buildImageUrl(poster);
    return (
        <div className="col-span-1 bg-pink-500 rounded-[4rem] flex flex-col items-center m-3">
            <img className="bg-transparent rounded-t-[3rem]" src={posterPath} />
            <div className="bg-red-500 text-center p-[1em] rounded-[4rem] bg-transparent flex items-center h-[15vh]">
                <div className="text-3xl max-w-[13ch]">{title}</div>
            </div>
        </div>
    );
}
