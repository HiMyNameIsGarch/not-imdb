import Router, { useRouter } from 'next/router';
import HistoryModal from 'components/HistoryModal';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from 'utils/api';
import { useState } from 'react';
import ActionBtn from 'components/ActionBtn';

export default function HistoryButton() {
    const [open, setOpen] = useState(false);
    const { id } = useRouter().query;
    const { data } = useSWR(`/api/history/${id}`);
    const { mutate } = useSWRConfig();

    function handleSubmit(formData) {
        mutate(`/api/history/${id}`, () =>
            fetcher(`/api/history/${id}`, {
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
        <span className="mr-2">
            <ActionBtn
                onClick={() => {
                    if (!data) {
                        setOpen(true);
                        return;
                    }
                    handleSubmit(null);
                }}
                text={data ? 'Remove from history' : 'Yeah, I watched this!'}
            />
            <HistoryModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
            />
        </span>
    );
}
