const FormLabel = ({ title, ...props }) => {
    return (
        <label
            className="text-2xl form-label inline-block mb-2 text-bluedark"
            {...props}
        >
            {title}
        </label>
    );
};
export default FormLabel;
