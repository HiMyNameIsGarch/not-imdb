import MovieCard from 'components/MovieCard';

export default function MovieSection({ title, data, baseLink = 'movies' }) {
    return (
        <div>
            <h1 className="text-4xl text-center my-10 font-semibold text-blue">
                {title}
            </h1>
            {title ? (
                <hr className="mx-56 h-1 text-blue bg-blue mb-10" />
            ) : (
                <div />
            )}

            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-2 my-3 mb-20">
                {data.map(
                    ({ id, title, release_date, poster_path, genre_ids }) => (
                        <MovieCard
                            key={id}
                            link={`${baseLink}/${id}`}
                            title={title}
                            release_date={release_date}
                            poster={poster_path}
                            genres={genre_ids}
                        />
                    ),
                )}
            </div>
        </div>
    );
}
