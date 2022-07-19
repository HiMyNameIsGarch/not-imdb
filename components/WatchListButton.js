import DataModal from 'components/WatchListModal';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from 'utils/api';
import ActionBtn from './ActionBtn';

export default function WatchListButton() {
    const [open, setOpen] = useState(false);
    const { id } = useRouter().query;
    const { data } = useSWR(`/api/watchlist/${id}`);
    const { mutate } = useSWRConfig();

    function handleSubmit(formData) {
        mutate(`/api/watchlist/${id}`, () =>
            fetcher(`/api/watchlist/${id}`, {
                method: data ? 'DELETE' : 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(() => {
                if (data) {
                    Router.push('/');
                }
                setOpen(false);
            }),
        );
    }
    return (
        <span>
            <ActionBtn
                onClick={() => {
                    if (!data) {
                        setOpen(true);
                        return;
                    }
                    handleSubmit(null);
                }}
                text={data ? 'Remove from watchlist' : 'Add to WatchList'}
            />
            <DataModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
            />
        </span>
    );
}
