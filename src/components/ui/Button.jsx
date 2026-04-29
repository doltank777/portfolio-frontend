export default function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
  className = "",
}) {
  const base =
    "rounded-lg px-5 py-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary: "bg-gray-900 text-white hover:bg-black",

    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",

    danger: "bg-red-50 text-red-700 hover:bg-red-100",

    blue: "bg-blue-50 text-blue-700 hover:bg-blue-100",

    like: "bg-red-50 text-red-700 hover:bg-red-100",

    liked: "bg-rose-200 text-rose-800 hover:bg-rose-300",

    outline:
      "border border-gray-400 bg-white text-gray-800 hover:bg-gray-100 active:bg-gray-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}