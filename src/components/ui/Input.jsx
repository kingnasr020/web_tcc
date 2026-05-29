const Input = ({
  className = "",
  ...props
}) => {
  return (
    <input
      className={`
        w-full
        px-4
        py-3
        rounded-2xl
        border
        border-slate-200
        outline-none
        focus:ring-2
        focus:ring-blue-500
        ${className}
      `}
      {...props}
    />
  );
};

export default Input;