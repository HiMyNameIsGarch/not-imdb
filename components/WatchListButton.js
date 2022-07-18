import DataModal from 'components/WatchListModal';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '../utils/api';

export default function WatchListButton() {
    const [open, setOpen] = useState(false);
    const { id } = useRouter().query;
    const { data } = useSWR(`/api/watchlist/${id}`);
    const { mutate } = useSWRConfig();

    function onClose() {
        setOpen(false);
    }

    function handleSubmit(formData) {
        mutate(`/api/watchlist/${id}`, () =>
            fetcher(`/api/watchlist/${id}`, {
                method: data !== null ? 'DELETE' : 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(() => {
                setOpen(false);
            }),
        );
    }
    return (
        <div>
            <button
                className={`bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded
    disabled:cursor-not-allowed`}
                onClick={() => {
                    if (data !== null) {
                        setOpen(true);
                        return;
                    }
                    handleSubmit(null);
                }}
            >
                {data !== null
                    ? "Maybe I don't wanna watch this!"
                    : 'Add to WatchList'}
            </button>
            <DataModal
                isOpen={open}
                onClose={() => onClose()}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
