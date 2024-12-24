export default function Search({ onType, value }) {
  return (
    <div className="mx-4">
      <input
        className="w-full outline-none border border-gray-300 rounded-sm p-2 focus:border-gray-500"
        placeholder="Search Users..."
        value={value}
        onChange={onType}
      />
    </div>
  );
}
