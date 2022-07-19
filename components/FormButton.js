const FormButton = ({ title, onSubmit }) => {
    return (
        <button
            className="items-center text-xl mt-5 text-blue font-semibold"
            onClick={onSubmit}
        >
            {title}
        </button>
    );
};
export default FormButton;
