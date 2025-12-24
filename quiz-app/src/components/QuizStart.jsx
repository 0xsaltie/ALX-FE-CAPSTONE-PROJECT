import { useState } from "react"
import SearchBar from "./SearchBar"

export default function QuizStart({ categories, onStart, loading }) {
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
    <div className="max-w-md mx-auto p-6 space-y-4">
      <SearchBar value={search} onChange={setSearch} />

      {filtered.length === 0 && (
        <p className="text-red-500">No matching topics found.</p>
      )}

      <select id="category" className="w-full border p-2">
        {filtered.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select id="difficulty" className="w-full border p-2">
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
        className="w-full border p-2"
      />

      <button
        onClick={handleStart}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? "Loading..." : "Start Quiz"}
      </button>
    </div>
  )
}
