import { useState } from "react"
import SearchBar from "./SearchBar"

export default function QuizStart({ categories, onStart, loading, dark }) {
  const [search, setSearch] = useState("")
  const filtered = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleStart = () => {
    onStart({
      amount: document.getElementById("amount").value,
      category: document.getElementById("category").value,
      difficulty: document.getElementById("difficulty").value,
    })
  }

  return (
    <div className={`max-w-md mx-auto p-6 space-y-4 rounded shadow ${
      dark ? "bg-gray-800 text-white" : "bg-white text-blue-900"
    }`}>
      <SearchBar value={search} onChange={setSearch} dark={dark} />

      {filtered.length === 0 && <p className="text-red-500">No matching topics found.</p>}

      <select id="category" className={`w-full border p-2 rounded ${
        dark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-blue-900 border-gray-300"
      }`}>
        {filtered.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select id="difficulty" className={`w-full border p-2 rounded ${
        dark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-blue-900 border-gray-300"
      }`}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input
        id="amount"
        type="number"
        min="1"
        max="20"
        defaultValue="5"
        className={`w-full border p-2 rounded ${
          dark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-blue-900 border-gray-300"
        }`}
      />

      <button
        onClick={handleStart}
        className={`w-full py-2 rounded ${
          dark ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Loading..." : "Start Quiz"}
      </button>
    </div>
  )
}
