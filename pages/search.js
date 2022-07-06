import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Layout from '../components/Layout';
import MovieCard from '../components/MovieCard';

function SearchBar() {
    const router = useRouter();
    const { terms } = router.query;
    const [text, setText] = useState('');

    // Update text input when route changes (ex when user goes back/forward)
    useEffect(() => {
        setText(terms || '');
    }, [terms]);

    // Update router history if a search was performed
    const handleSearch = (event) => {
        event.preventDefault();
        if (text !== terms) {
            router.push(`/search/?terms=${text}`, undefined, { shallow: true });
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <div className="grid grid-cols-12 gap-4 mb-5">
                <div className="col-span-10">
                    <input
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="text"
                        placeholder="Search for a movie..."
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                    />
                </div>
                <div className="col-span-2 flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-green-500 text-white font-normal leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        Movie Time!
                    </button>
                </div>
            </div>
        </form>
    );
}
function SearchResults() {
    const { terms } = useRouter().query;
    const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

    if (!terms) {
        return (
            <h1>Type some terms, submit and wait for the movies to appear!</h1>
        );
    }
    if (error) {
        return (
            <h1 className="bg-red-500">
                Error finding movies for {terms}: {JSON.stringify(error)}
            </h1>
        );
    }
    if (!data) {
        return <h1>In progress...</h1>;
    }
    if (!data.results.length) {
        return <h1>:(((( No results </h1>;
    }
    return (
        <div className="grid grid-cols-3 gap-4">
            {data.results.map(
                ({
                    id,
                    title,
                    overview,
                    release_date,
                    vote_average,
                    vote_count,
                }) => (
                    <MovieCard
                        key={id}
                        id={id}
                        title={title}
                        overview={overview}
                        release_date={release_date}
                        vote_average={vote_average}
                        vote_count={vote_count}
                    />
                ),
            )}
        </div>
    );
}

export default function Search() {
    return (
        <Layout title="Search">
            <div className="w-full max-w-7xl mx-auto px-8">
                <div className="flex items-stretch flex-col">
                    <SearchBar />
                    <SearchResults />
                </div>
            </div>
        </Layout>
    );
}
