export default function SearchBar({ value, onChange, dark }) {
  return (
    <input
      type="text"
      placeholder="Search quiz topics..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-2 border rounded mb-4 ${
        dark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-blue-900 border-gray-300"
      }`}
    />
  )
}
