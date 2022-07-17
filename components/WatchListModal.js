import PopupModal from 'components/PopupModal';
import { useState } from 'react';
import Textarea from 'components/Textarea';
import FormButton from 'components/FormButton';

export default function DataModal({ isOpen, onClose, onSubmit }) {
    const [expectations, setExpectations] = useState('');
    const [references, setReferences] = useState('');

    function submit(e) {
        e.preventDefault();
        onSubmit({ expectations, references });
    }

    function expectationsBlur(e) {
        const value = e.target.value;
        setExpectations(value);
    }

    function referencesBlur(e) {
        const value = e.target.value;
        setReferences(value);
    }

    return (
        <PopupModal open={isOpen} onClose={onClose}>
            <div className="text-3xl text-center">Adding to watchlist...</div>
            <form className="flex flex-col" onSubmit={submit}>
                <Textarea
                    title="Do you have some kind of expectations?"
                    placeholder="Expectations"
                    onBlur={expectationsBlur}
                />
                <Textarea
                    title="Maybe some future references?"
                    placeholder="References"
                    onBlur={referencesBlur}
                />
                <FormButton title="Submit" onSubmit={submit} />
            </form>
        </PopupModal>
    );
}
