const Card = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-white
        rounded-[28px]
        shadow-lg
        p-6
        border
        border-slate-100
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;