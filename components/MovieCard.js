import Link from 'next/link';
import { buildImageUrl } from 'utils/api';

export default function MovieCard({ link, title, poster, release_date }) {
    const year = new Date(release_date).getFullYear();
    const posterPath = buildImageUrl(poster);
    return (
        <Link href={link} passHref>
            <div
                className="col-span-1 m-2 rounded-[3rem] bg-gradient-to-tr from-red via-red to-redwhite hover:scale-110 transition-all duration-200 ease-in hover:shadow-blue shadow-md hover:cursor-pointer"
                as="a"
                variant="link"
            >
                <div className="p-6">
                    <img
                        className="bg-transparent rounded-[1rem] mb-3"
                        src={posterPath}
                    />
                    <div className="top-auto bottom-auto">
                        <div className="text-left text-lg text-white font-extrabold bottom-0">
                            {title}
                        </div>
                        <div className="text-white bottom-0 font-medium">
                            <span className="text-sm">{year}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
