import MovieSection from 'components/MovieSection';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Layout from 'components/Layout';
import ProgressBar from 'components/ProgressBar';

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
                        className="px-6 py-2.5 bg-pink-500 text-white font-normal leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
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
            <ErrorMsg
                errorStr={`Error fetching movie with ID ${id}: ${JSON.stringify(
                    error,
                )}`}
            />
        );
    }
    if (!data) return <ProgressBar />;
    if (!data.results.length) return <h1 className="text-3xl">No results</h1>;

    return <MovieSection title="" data={data.results} />;
}

export default function Search() {
    return (
        <Layout title="Search">
            <div className="flex items-stretch flex-col">
                <SearchBar />
                <SearchResults />
            </div>
        </Layout>
    );
}
