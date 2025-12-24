export default function QuestionCard({ question, onAnswer }) {
  const options = [...question.incorrect_answers, question.correct_answer]
    .sort(() => Math.random() - 0.5)

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2
        className="text-xl font-bold"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onAnswer(opt)}
          className="w-full border p-2 rounded hover:bg-gray-100"
          dangerouslySetInnerHTML={{ __html: opt }}
        />
      ))}
    </div>
  )
}

