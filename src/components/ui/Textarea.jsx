export default function Textarea({
  id,
  name,
  value,
  onChange,
  placeholder,
  maxLength,
  rowsClass = "min-h-[320px]",
}) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`${rowsClass} w-full resize-y rounded-lg border border-gray-300 p-4 leading-7 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10`}
    />
  );
}