import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "./firebase"

import QuizStart from "./components/QuizStart"
import QuestionCard from "./components/QuestionCard"
import ScoreSummary from "./components/ScoreSummary"
import QuizHistory from "./components/QuizHistory"
import Auth from "./components/Auth"

export default function App() {
  /* ================= AUTH ================= */
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setAuthLoading(false)
    })
    return unsub
  }, [])

  /* ================= THEME ================= */
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  /* ================= QUIZ STATE ================= */
  const [categories, setCategories] = useState([])
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(false)

  /* ================= HISTORY ================= */
  const storageKey = user ? `quizHistory_${user.uid}` : null

  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    if (storageKey) {
      const saved = JSON.parse(localStorage.getItem(storageKey)) || []
      setHistory(saved)
    }
  }, [storageKey])

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories))
  }, [])

  /* ================= START QUIZ ================= */
  const startQuiz = async ({ amount, category, difficulty }) => {
    setLoading(true)
    setScore(0)
    setCurrent(0)
    setAnswers([])
    setFinished(false)

    const res = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    )
    const data = await res.json()

    setQuestions(data.results)
    setStarted(true)
    setLoading(false)
  }

  /* ================= ANSWER ================= */
  const handleAnswer = (selected) => {
    if (!questions[current]) return

    const correct = questions[current].correct_answer
    if (selected === correct) setScore((s) => s + 1)

    setAnswers((prev) => [
      ...prev,
      {
        question: questions[current].question,
        correct,
        selected,
      },
    ])

    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1)
    } else {
      finishQuiz()
    }
  }

  /* ================= FINISH QUIZ ================= */
  const finishQuiz = () => {
    setFinished(true)
    setStarted(false)

    const newEntry = {
      date: new Date().toLocaleString(),
      score,
      total: questions.length,
      category: questions[0]?.category || "Unknown",
    }

    const updated = [...history, newEntry]
    setHistory(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
  }

  /* ================= DELETE HISTORY ================= */
  const deleteHistoryItem = (index) => {
    const updated = history.filter((_, i) => i !== index)
    setHistory(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
  }

  /* ================= AUTH LOADING ================= */
  if (authLoading) {
    return <p className="text-center mt-20">Loading...</p>
  }

  /* ================= NOT LOGGED IN ================= */
  if (!user) {
    return <Auth />
  }

  /* ================= UI ================= */
  return (
    <div className={`min-h-screen p-4 ${dark ? "bg-gray-900 text-white" : "bg-blue-50 text-blue-900"}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quiz App</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setDark((d) => !d)}
            className="px-3 py-1 rounded bg-gray-600 text-white"
          >
            {dark ? "Light" : "Dark"}
          </button>

          <button
            onClick={() => signOut(auth)}
            className="px-3 py-1 rounded bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Quiz Start & History */}
      {!started && !finished && (
        <>
          <QuizStart
            categories={categories}
            onStart={startQuiz}
            loading={loading}
            dark={dark}
          />

          <div className="flex justify-center mt-6 mb-6">
            <button
              onClick={() => setShowHistory((s) => !s)}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              {showHistory ? "Hide History" : "Show History"}
            </button>
          </div>

          {showHistory && (
            <QuizHistory
              history={history}
              dark={dark}
              onDelete={deleteHistoryItem}
            />
          )}
        </>
      )}

      {/* Quiz */}
      {started && (
        <QuestionCard
          question={questions[current]}
          index={current}
          total={questions.length}
          onAnswer={handleAnswer}
          dark={dark}
        />
      )}

      {/* Results */}
      {finished && (
        <ScoreSummary
          score={score}
          total={questions.length}
          answers={answers}
          onRestart={() => {
            setFinished(false)
            setStarted(false)
          }}
          dark={dark}
        />
      )}
    </div>
  )
}
