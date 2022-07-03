import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '../utils/api';

export default function HistoryButton() {
    const { id } = useRouter().query;
    const { data } = useSWR(`/api/history/${id}`);
    const { mutate } = useSWRConfig();

    return (
        <button
            disabled={data?.found ? 'true' : 'false'}
            className={`bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded
                disabled:cursor-not-allowed`}
            onClick={() => {
                mutate(`/api/history/${id}`, () =>
                    fetcher(`/api/history/${id}`, {
                        method: data.found ? 'DELETE' : 'PUT',
                    }),
                );
            }}
        >
            {data?.found ? 'Remove from history' : 'Add to history'}
        </button>
    );
}
