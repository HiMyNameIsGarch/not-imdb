const Badge = ({ children }) => {
    return (
        <span className="text-blue inline-block border-2 border-solid border-bluedark rounded-xl mr-2 text-xs font-semibold p-[0.3rem]">
            {children}
        </span>
    );
};
export default Badge;
