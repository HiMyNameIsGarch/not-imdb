const FormButton = ({ title, onSubmit }) => {
    return (
        <button
            className="items-center mt-5 text-blue-700 font-semibold"
            onClick={onSubmit}
        >
            {title}
        </button>
    );
};
export default FormButton;
