import FormButton from 'components/FormButton';
import FormLabel from 'components/FormLabel';
import PopupModal from 'components/PopupModal';
import Textarea from 'components/Textarea';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Router, { useRouter } from 'next/router';

const defaultMarkMsg = 'Give it a mark!';
const defaultMarkValue = 5;
const getMarkText = (value) => defaultMarkMsg + ' -> ' + value;

export default function DataModal({ isOpen, onClose, onSubmit }) {
    const { id } = useRouter().query;
    const { data } = useSWR(`/api/watchlist/${id}`);
    const [markMsg, setMarkMsg] = useState(getMarkText(defaultMarkValue));
    const [state, setState] = useState({
        mark: defaultMarkValue,
        expectations: '',
        review: '',
    });

    useEffect(() => {
        if (data?.expectations) {
            setState({
                ...state,
                ['expectations']: data.expectations,
            });
        }
    }, [data]);

    function submit(e) {
        e.preventDefault();
        onSubmit(state);
        Router.push(`/history/${id}`);
    }

    const handleChange = (e) => {
        if (e.target.name == 'mark') {
            setMarkMsg(getMarkText(e.target.value));
        }
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <PopupModal open={isOpen} onClose={onClose}>
            <div className="text-3xl text-center text-bluedark font-semibold mb-3">
                I heard you finished this movie...
            </div>
            <form className="flex flex-col" onSubmit={submit}>
                <FormLabel title={markMsg} />
                <input
                    type="range"
                    name="mark"
                    min="1"
                    max="10"
                    onChange={handleChange}
                    defaultValue={state.mark}
                    className="form-range appearance-none w-full h-[0.35rem] p-0 bg-blue rounded-2xl focus:outline-none focus:ring-0 focus:shadow-none"
                />
                <Textarea
                    title="Expectations"
                    placeholder="Expectations"
                    onBlur={handleChange}
                    name="expectations"
                    defaultValue={state.expectations}
                />
                <Textarea
                    title="Review"
                    placeholder="Write here your opinion"
                    onBlur={handleChange}
                    name="review"
                />{' '}
                <FormButton title="Submit" onSubmit={submit} />
            </form>
        </PopupModal>
    );
}
