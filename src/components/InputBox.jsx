export default function InputBox({
  label,
  placeHolder,
  changeInput,
  value,
  name,
  inputType,
}) {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={name} className="text-lg">
        {label}
      </label>
      <input
        id={name}
        type={inputType}
        placeholder={placeHolder}
        onChange={changeInput}
        value={value}
        name={name}
        className="outline-none border border-gray-300 rounded-sm p-2 focus:border-gray-500"
      />
    </div>
  );
}
