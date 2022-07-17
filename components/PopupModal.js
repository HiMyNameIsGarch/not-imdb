import { createPortal } from 'react-dom';
import { useEffect } from 'react';
export default function Modal({ open, onClose, children }) {
    const isWindow = () => typeof window !== 'undefined';

    function escHandler({ key }) {
        if (key === 'Escape') {
            onClose();
        }
    }

    useEffect(() => {
        if (isWindow()) window.addEventListener('keydown', escHandler);

        return () => {
            if (isWindow()) window.removeEventListener('keydown', escHandler);
        };
    }, []);

    if (isWindow()) {
        return createPortal(
            <div
                className={`fixed inset-0 z-50 overflow-auto bg-smoke-light flex ${
                    open ? '' : 'pointer-events-none'
                }`}
            >
                {/* backdrop */}
                <div
                    className={`fixed inset-0 bg-black ${
                        open ? 'opacity-50' : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={onClose}
                />

                {/* content */}

                <div
                    className={`relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg ${
                        open ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                >
                    {children}
                    <span
                        className="absolute top-0 right-0 p-2 pr-4 hover:cursor-pointer font-bold"
                        onClick={onClose}
                    >
                        X
                    </span>
                </div>
            </div>,
            document.body,
        );
    } else {
        return null;
    }
}
