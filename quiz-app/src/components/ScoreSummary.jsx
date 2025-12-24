export default function ScoreSummary({ score, total, answers, onRestart, dark }) {
  return (
    <div className={`max-w-xl mx-auto p-6 rounded shadow ${dark ? "bg-gray-800 text-white" : "bg-white text-blue-900"}`}>
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="mb-4">Your Score: {score} / {total}</p>

      <div className="space-y-4">
        {answers.map((ans, idx) => (
          <div key={idx} className={`p-4 border rounded ${ans.correct ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"} ${dark ? "bg-opacity-30" : ""}`}>
            <p className="font-semibold" dangerouslySetInnerHTML={{ __html: ans.question }} />
            <p>
              Your Answer:{" "}
              <span dangerouslySetInnerHTML={{ __html: ans.selected || "<em>No answer</em>" }} />
            </p>
            {!ans.correct && (
              <p>
                Correct Answer:{" "}
                <span dangerouslySetInnerHTML={{ __html: ans.correct_answer }} className="font-bold" />
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className={`mt-6 px-4 py-2 rounded ${dark ? "bg-gray-700 text-white" : "bg-blue-600 text-white"}`}
      >
        Restart Quiz
      </button>
    </div>
  )
}

