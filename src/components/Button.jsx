export default function Button({ label, onPress }) {
  return (
    <button
      onClick={onPress}
      className="mb-4 w-full py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
    >
      {label}
    </button>
  );
}
