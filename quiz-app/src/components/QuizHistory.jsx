export default function QuizHistory({ history, onDelete, dark }) {
  if (!history.length) {
    return <p className="text-center opacity-70">No quiz history yet.</p>
  }

  return (
    <div className="max-w-xl mx-auto space-y-3">
      <h2 className="text-xl font-bold mb-2">Quiz History</h2>

      {history.map((item, idx) => (
        <div
          key={idx}
          className={`flex justify-between items-center p-3 rounded border ${
            dark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div>
            <p className="font-semibold">
              {item.date} — {item.category}
            </p>
            <p className="text-sm">
              Score: {item.score}/{item.total}{" "}
              {item.partial && "(Partial)"}
            </p>
          </div>

          <button
            onClick={() => onDelete(idx)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}


