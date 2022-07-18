import { useRouter } from 'next/router';
import HistoryModal from 'components/HistoryModal';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '../utils/api';
import { useState } from 'react';

export default function HistoryButton() {
    const [open, setOpen] = useState(false);
    const { id } = useRouter().query;
    const { data } = useSWR(`/api/history/${id}`);
    const { mutate } = useSWRConfig();

    function onClose() {
        setOpen(false);
    }

    function handleSubmit(formData) {
        mutate(`/api/history/${id}`, () =>
            fetcher(`/api/history/${id}`, {
                method: data ? 'DELETE' : 'PUT',
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
                    if (!data) {
                        setOpen(true);
                        return;
                    }
                    handleSubmit(null);
                }}
            >
                {data ? 'Remove from history' : 'Yeah, I watched this!'}
            </button>
            <HistoryModal
                isOpen={open}
                onClose={() => onClose()}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
