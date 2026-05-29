const Button = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        px-5
        py-3
        rounded-2xl
        font-semibold
        transition-all
        duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;