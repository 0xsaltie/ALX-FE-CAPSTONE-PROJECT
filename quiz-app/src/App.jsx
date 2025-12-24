import { useEffect, useState } from "react"
import QuizStart from "./components/QuizStart"
import QuestionCard from "./components/QuestionCard"
import ScoreSummary from "./components/ScoreSummary"
import QuizHistory from "./components/QuizHistory"
import { fetchCategories, fetchQuestions } from "./utils/api"

export default function App() {
  const [categories, setCategories] = useState([])
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dark, setDark] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [showHistory, setShowHistory] = useState(false)

  // Load categories
  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  // Save history when quiz ends (full or partial)
  useEffect(() => {
    if (current === questions.length && questions.length > 0) {
      const history = JSON.parse(localStorage.getItem("quizHistory")) || []
      history.push({
        category: questions[0]?.category || "Unknown",
        score,
        total: questions.length,
        date: new Date().toLocaleDateString(),
        partial: answers.length < questions.length,
      })
      localStorage.setItem("quizHistory", JSON.stringify(history))
    }
  }, [current])

  // Timer for each question
  useEffect(() => {
    if (!started || current >= questions.length) return
    setTimeLeft(15)
    const timer = setInterval(() => {
      setTimeLeft((t) => (t <= 1 ? 0 : t - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [current, started])

  const startQuiz = async (settings) => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchQuestions(settings)
      if (!data.length) throw new Error("No questions available")
      setQuestions(data)
      setStarted(true)
      setCurrent(0)
      setScore(0)
      setAnswers([])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const submitAnswer = (answer) => {
    if (current >= questions.length) return

    const correctAnswer = questions[current]?.correct_answer
    const correct = correctAnswer === answer

    if (correct) setScore((s) => s + 1)

    setAnswers([
      ...answers,
      {
        question: questions[current]?.question,
        selected: answer,
        correct,
        correct_answer: correctAnswer,
      },
    ])
    setCurrent((c) => c + 1)
  }

  const quitQuiz = () => {
    setCurrent(questions.length) // forces ScoreSummary to show
  }

  const restart = () => {
    setStarted(false)
    setQuestions([])
    setCurrent(0)
    setScore(0)
    setAnswers([])
  }

  const toggleDark = () => setDark((d) => !d)
  const toggleHistory = () => setShowHistory((prev) => !prev)

  const deleteHistoryItem = (index) => {
    const history = JSON.parse(localStorage.getItem("quizHistory")) || []
    history.splice(index, 1)
    localStorage.setItem("quizHistory", JSON.stringify(history))
    setShowHistory((prev) => prev) // force re-render
  }

  const containerClass = dark
    ? "min-h-screen bg-gray-900 text-white p-4"
    : "min-h-screen bg-blue-100 text-blue-900 p-4"

  const progressPercent = questions.length > 0 ? (current / questions.length) * 100 : 0

  return (
    <div className={containerClass}>
      {/* Dark Mode Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleDark}
          className={`px-4 py-2 border rounded ${
            dark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-blue-900 border-gray-300"
          }`}
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {error && <p className="text-red-600 text-center">{error}</p>}

    {/* Quiz Start & History */}
{!started && (
  <>
    <QuizStart categories={categories} onStart={startQuiz} loading={loading} dark={dark} />

    {/* Show/Hide History */}
    <div className="flex justify-center mt-6 mb-6"> 
      <button
        onClick={toggleHistory}
        className={`px-4 py-2 rounded ${dark ? "bg-gray-700 text-white" : "bg-blue-600 text-white"}`}
      >
        {showHistory ? "Hide History" : "Show History"}
      </button>
    </div>

    {showHistory && <QuizHistory dark={dark} onDelete={deleteHistoryItem} />}
  </>
)}


      {/* Quiz in Progress */}
      {started && questions.length > 0 && current < questions.length && (
        <>
          {/* Progress Bar */}
          <div className="max-w-xl mx-auto mb-2 bg-gray-300 rounded h-3">
            <div
              className={`h-3 rounded ${dark ? "bg-green-500" : "bg-blue-600"}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Timer + Quit Button */}
          <div className="max-w-xl mx-auto mb-4 flex justify-between items-center">
            <span className={`font-bold ${dark ? "text-white" : "text-blue-900"}`}>
              Time Left: {timeLeft}s
            </span>
            <button
              onClick={quitQuiz}
              className={`px-4 py-2 rounded ${dark ? "bg-red-600 text-white" : "bg-red-500 text-white"}`}
            >
              Quit Quiz
            </button>
          </div>

          {/* Question Card */}
          <QuestionCard
            question={questions[current]}
            onAnswer={submitAnswer}
            dark={dark}
            timeLeft={timeLeft}
          />
        </>
      )}

      {/* Score Summary */}
      {started && current >= questions.length && questions.length > 0 && (
        <ScoreSummary
          score={score}
          total={questions.length}
          answers={answers}
          onRestart={restart}
          dark={dark}
        />
      )}
    </div>
  )
}
