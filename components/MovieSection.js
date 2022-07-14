import MovieCard from 'components/MovieCard';

export default function MovieSection({ title, data }) {
    return (
        <div>
            <h1 className="text-4xl text-center my-5">{title}</h1>
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-2 my-3">
                {data.map(
                    ({ id, title, release_date, poster_path, genre_ids }) => (
                        <MovieCard
                            key={id}
                            id={id}
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
