export default function QuizHistory() {
  const history = JSON.parse(localStorage.getItem("quizHistory")) || []

  if (!history.length) {
    return <p className="text-center text-gray-500">No quiz history yet.</p>
  }

  return (
    <div className="max-w-md mx-auto mt-6">
      <h3 className="text-lg font-bold mb-2">Quiz History</h3>

      <ul className="space-y-2">
        {history.map((q, i) => (
          <li key={i} className="border p-2 rounded">
            <p><strong>Category:</strong> {q.category}</p>
            <p><strong>Score:</strong> {q.score} / {q.total}</p>
            <p className="text-sm text-gray-500">{q.date}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
