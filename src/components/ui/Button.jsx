export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-bold transition disabled:cursor-not-allowed disabled:opacity-60";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-base",
  };

  const variants = {
    primary: "bg-gray-900 text-white hover:bg-black",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    danger: "bg-red-50 text-red-700 hover:bg-red-100",
    blue: "bg-blue-600 text-white hover:bg-blue-700",
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
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}