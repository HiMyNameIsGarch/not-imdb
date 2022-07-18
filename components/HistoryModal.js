import PopupModal from 'components/PopupModal';
import { useState } from 'react';
import Textarea from 'components/Textarea';
import FormButton from 'components/FormButton';
import FormLabel from 'components/FormLabel';

const defaultMarkMsg = 'Give it a mark!';
const defaultMarkValue = 5;
const getMarkText = (value) => defaultMarkMsg + ' -> ' + value;

export default function DataModal({ isOpen, onClose, onSubmit }) {
    const [markMsg, setMarkMsg] = useState(getMarkText(defaultMarkValue));
    const [state, setState] = useState({
        mark: defaultMarkValue,
        expectations: '',
        review: '',
    });

    function submit(e) {
        e.preventDefault();
        onSubmit(state);
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
            <div className="text-3xl text-center mb-3">
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
                />
                <Textarea
                    title="Expectations"
                    placeholder="Expectations"
                    onBlur={handleChange}
                    name="expectations"
                />
                <Textarea
                    title="Review"
                    placeholder="Write here your opinion"
                    onBlur={handleChange}
                    name="review"
                />
                <FormButton title="Submit" onSubmit={submit} />
            </form>
        </PopupModal>
    );
}
