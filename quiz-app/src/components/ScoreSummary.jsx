export default function ScoreSummary({ score, total, answers, onRestart }) {
  return (
    <div className="max-w-xl mx-auto p-6 text-center space-y-4">
      <h2 className="text-2xl font-bold">Final Score</h2>
      <p>{score} / {total}</p>

      <div className="text-left">
        {answers.map((a, i) => (
          <p key={i} className={a.correct ? "text-green-600" : "text-red-600"}>
            {a.question}
          </p>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Retake Quiz
      </button>
    </div>
  )
}
