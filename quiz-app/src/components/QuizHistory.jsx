export default function QuizHistory({ dark, onDelete }) {
  const history = JSON.parse(localStorage.getItem("quizHistory")) || []

  if (!history.length) return <p className="text-center">No quiz history yet.</p>

  return (
    <div className={`max-w-xl mx-auto p-4 space-y-2 ${dark ? "text-white" : "text-blue-900"}`}>
      <h2 className="text-xl font-bold mb-2">Quiz History</h2>
      {history.map((item, idx) => (
        <div
          key={idx}
          className={`flex justify-between items-center p-2 border rounded ${
            dark ? "bg-gray-700" : "bg-white"
          }`}
        >
          <div>
            <p>{item.date} - {item.category}</p>
            <p>Score: {item.score} / {item.total} {item.partial ? "(Partial)" : ""}</p>
          </div>
          <button
            onClick={() => onDelete(idx)}
            className={`px-2 py-1 rounded ${dark ? "bg-red-600 text-white" : "bg-red-500 text-white"}`}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

