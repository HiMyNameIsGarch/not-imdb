import MovieCard from 'components/MovieCard';

export default function MovieSection({ title, data }) {
    return (
        <div>
            <h1 className="text-4xl text-center my-5">{title}</h1>
            <div className="grid grid-cols-3 gap-4 my-3">
                {data.map(
                    ({
                        id,
                        title,
                        overview,
                        release_date,
                        vote_average,
                        vote_count,
                        poster_path,
                    }) => (
                        <MovieCard
                            key={id}
                            id={id}
                            title={title}
                            overview={overview}
                            release_date={release_date}
                            vote_average={vote_average}
                            vote_count={vote_count}
                            poster={poster_path}
                        />
                    ),
                )}
            </div>
        </div>
    );
}
