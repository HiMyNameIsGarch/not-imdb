import Link from 'next/link';
import { buildImageUrl } from 'utils/api';

export default function MovieCard({ link, title, poster, release_date }) {
    const year = new Date(release_date).getFullYear();
    const posterPath = buildImageUrl(poster);
    return (
        <div className="col-span-1 m-2 rounded-[3rem] bg-pink-600">
            <div className="p-6">
                <img
                    className="bg-transparent rounded-[1rem] mb-3"
                    src={posterPath}
                />
                <div className="top-auto bottom-auto">
                    <div className="text-left text-white font-extrabold bottom-0">
                        <Link href={link} passHref>
                            <div
                                as="a"
                                variant="link"
                                className="text-lg hover:underline hover:cursor-pointer"
                            >
                                {title}
                            </div>
                        </Link>
                    </div>
                    <div className="text-white bottom-0">
                        <span className="text-sm">{year}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
