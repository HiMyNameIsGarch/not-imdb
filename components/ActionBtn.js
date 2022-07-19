const ActionBtn = ({ text, onClick }) => {
    return (
        <button
            className={`bg-transparent text-blue font-semibold py-2 px-4 border border-bluedark rounded hover:text-bluedark hover:border-blue
                disabled:cursor-not-allowed`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};
export default ActionBtn;
