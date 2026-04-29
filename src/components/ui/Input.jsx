export default function Input({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  maxLength,
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className="h-12 w-full rounded-lg border border-gray-300 px-4 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
    />
  );
}