import { useEffect, useState } from "react"

export default function QuestionCard({ question, onAnswer, dark, timeLeft, index, total }) {
  if (!question) return null

  const [selected, setSelected] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [options, setOptions] = useState([])

  // Prepare options once per question
  useEffect(() => {
    const shuffled = [...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - 0.5
    )
    setOptions(shuffled)
    setSelected(null)
    setDisabled(false)
  }, [question])

  // Auto-submit when timer ends
  useEffect(() => {
    if (timeLeft === 0 && !disabled) {
      setDisabled(true)
      onAnswer(null)
    }
  }, [timeLeft, disabled, onAnswer])

  const handleClick = (opt) => {
    if (disabled) return
    setSelected(opt)
    setDisabled(true)
    onAnswer(opt)
  }

  const progressPercent = ((index + 1) / total) * 100

  return (
    <div
      className={`max-w-xl mx-auto p-6 space-y-4 rounded shadow ${
        dark ? "bg-gray-800 text-white" : "bg-white text-blue-900"
      }`}
    >
      {/* Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full ${
            dark ? "bg-green-400" : "bg-blue-500"
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <p className="text-sm font-semibold">
        Question {index + 1} of {total}
      </p>

      {/* Question */}
      <h2
        className="text-xl font-bold"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      {/* Timer */}
      <p className="text-sm font-semibold">⏱ Time left: {timeLeft}s</p>

      {/* Options */}
      <div className="space-y-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(opt)}
            disabled={disabled}
            className={`w-full border p-2 rounded text-left select-none cursor-pointer focus:outline-none transition-colors ${
              disabled
                ? "opacity-50 cursor-not-allowed"
                : dark
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-white text-blue-900 hover:bg-blue-100"
            } ${selected === opt ? "ring-2 ring-yellow-400" : ""}`}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
    </div>
  )
}


