import Link from 'next/link';

export default function MovieCard({
    id,
    title,
    overview,
    release_date,
    vote_average,
    vote_count,
}) {
    return (
        <div className="col-span-1">
            <div className="font-bold py-3 px-6 border-b border-gray-300 text-gray-600 text-center">
                {vote_average + ' / 10 ' + ' with ' + vote_count + ' votes'}
            </div>
            <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
                <div className="p-6">
                    <Link href={`/movies/${id}`} passHref>
                        <h5
                            as="a"
                            variant="link"
                            className="text-gray-900 text-xl font-bold hover:underline hover:cursor-pointer mb-2"
                        >
                            {title}
                        </h5>
                    </Link>
                    <p className="text-gray-700 text-base mb-1">
                        {overview.slice(0, 75) || 'No description'}
                        ...
                    </p>
                </div>
                <div className="font-bold py-3 px-6 border-t border-gray-300 text-gray-600">
                    {release_date || 'No release date'}
                </div>
            </div>
        </div>
    );
}
