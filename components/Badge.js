const Badge = ({ children }) => {
    return (
        <span className="inline-block border-2 border-solid border-pink-500 rounded-xl mr-2 text-xs font-semibold p-[0.3rem]">
            {children}
        </span>
    );
};
export default Badge;
