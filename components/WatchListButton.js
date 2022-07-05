import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '../utils/api';

export default function HistoryButton() {
    const { id } = useRouter().query;
    const { data } = useSWR(`/api/watchlist/${id}`);
    const { mutate } = useSWRConfig();
    return (
        <button
            className={`bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded
                disabled:cursor-not-allowed`}
            onClick={() => {
                mutate(`/api/watchlist/${id}`, () =>
                    fetcher(`/api/watchlist/${id}`, {
                        method: data.found ? 'DELETE' : 'PUT',
                    }),
                );
            }}
        >
            {data?.found ? 'Remove from WatchList' : 'Add to WatchList'}
        </button>
    );
}
