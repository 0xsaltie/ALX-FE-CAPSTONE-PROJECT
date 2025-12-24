import { useEffect, useState } from "react"

export default function QuestionCard({ question, onAnswer, dark, timeLeft }) {
  const [selected, setSelected] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [options, setOptions] = useState([])

  // Prepare options once per question
  useEffect(() => {
    const shuffled = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)
    setOptions(shuffled)
    setSelected(null)
    setDisabled(false)
  }, [question])

  // Auto-disable buttons when timer ends
  useEffect(() => {
    if (timeLeft === 0 && !disabled) {
      setDisabled(true)
      setTimeout(() => {
        onAnswer(null) // auto-submit
      }, 500)
    }
  }, [timeLeft, onAnswer, disabled])

  const handleClick = (opt) => {
    if (disabled) return
    setSelected(opt)
    setDisabled(true)
    setTimeout(() => onAnswer(opt), 500)
  }

  return (
    <div
      className={`max-w-xl mx-auto p-6 space-y-4 rounded shadow ${
        dark ? "bg-gray-800 text-white" : "bg-white text-blue-900"
      }`}
    >
      <h2 className="text-xl font-bold" dangerouslySetInnerHTML={{ __html: question.question }} />

      <div className="space-y-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleClick(opt)}
            disabled={disabled}
            className={`w-full border p-2 rounded text-left ${
              dark
                ? "bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
                : "bg-white text-blue-900 hover:bg-blue-100 disabled:opacity-50"
            } ${selected === opt ? "ring-2 ring-yellow-400" : ""}`}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
    </div>
  )
}
