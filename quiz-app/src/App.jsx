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

  // ✅ HISTORY STATE (source of truth)
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("quizHistory")) || []
  })

  /* -------------------- LOAD CATEGORIES -------------------- */
  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  /* -------------------- SAVE HISTORY ON QUIZ END -------------------- */
  useEffect(() => {
    if (current === questions.length && questions.length > 0) {
      const newEntry = {
        category: questions[0]?.category || "Unknown",
        score,
        total: questions.length,
        date: new Date().toLocaleDateString(),
        partial: answers.length < questions.length,
      }

      const updatedHistory = [...history, newEntry]
      setHistory(updatedHistory)
      localStorage.setItem("quizHistory", JSON.stringify(updatedHistory))
    }
  }, [current])

  /* -------------------- TIMER -------------------- */
  useEffect(() => {
    if (!started || current >= questions.length) return

    setTimeLeft(15)
    const timer = setInterval(() => {
      setTimeLeft((t) => (t <= 1 ? 0 : t - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [current, started])

  /* -------------------- QUIZ LOGIC -------------------- */
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

    const correctAnswer = questions[current].correct_answer
    const correct = correctAnswer === answer

    if (correct) setScore((s) => s + 1)

    setAnswers((prev) => [
      ...prev,
      {
        question: questions[current].question,
        selected: answer,
        correct,
        correct_answer: correctAnswer,
      },
    ])

    setCurrent((c) => c + 1)
  }

  const quitQuiz = () => {
    setCurrent(questions.length)
  }

  const restart = () => {
    setStarted(false)
    setQuestions([])
    setCurrent(0)
    setScore(0)
    setAnswers([])
  }

  /* -------------------- HISTORY DELETE -------------------- */
  const deleteHistoryItem = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index)
    setHistory(updatedHistory)
    localStorage.setItem("quizHistory", JSON.stringify(updatedHistory))
  }

  /* -------------------- UI -------------------- */
  const toggleDark = () => setDark((d) => !d)
  const toggleHistory = () => setShowHistory((s) => !s)

  const containerClass = dark
    ? "min-h-screen bg-gray-900 text-white p-4"
    : "min-h-screen bg-blue-100 text-blue-900 p-4"

  const progressPercent =
    questions.length > 0 ? (current / questions.length) * 100 : 0

  return (
    <div className={containerClass}>
      {/* Dark Mode Toggle */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleDark}
          className={`px-4 py-2 rounded border ${
            dark ? "bg-gray-700 text-white" : "bg-white"
          }`}
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* START SCREEN */}
      {!started && (
        <>
          <QuizStart
            categories={categories}
            onStart={startQuiz}
            loading={loading}
            dark={dark}
          />

          {/* SPACING FIX */}
          <div className="flex justify-center mt-8 mb-6">
            <button
              onClick={toggleHistory}
              className={`px-4 py-2 rounded ${
                dark ? "bg-gray-700" : "bg-blue-600 text-white"
              }`}
            >
              {showHistory ? "Hide History" : "Show History"}
            </button>
          </div>

          {showHistory && (
            <QuizHistory
              history={history}
              onDelete={deleteHistoryItem}
              dark={dark}
            />
          )}
        </>
      )}

      {/* QUIZ */}
      {started && current < questions.length && (
        <>
          <div className="max-w-xl mx-auto mb-2 bg-gray-300 rounded h-3">
            <div
              className={`h-3 rounded ${dark ? "bg-green-500" : "bg-blue-600"}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="max-w-xl mx-auto mb-4 flex justify-between">
            <span>Time Left: {timeLeft}s</span>
            <button
              onClick={quitQuiz}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Quit
            </button>
          </div>

          <QuestionCard
            question={questions[current]}
            onAnswer={submitAnswer}
            dark={dark}
            timeLeft={timeLeft}
          />
        </>
      )}

      {/* SCORE SUMMARY */}
      {started && current >= questions.length && (
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
