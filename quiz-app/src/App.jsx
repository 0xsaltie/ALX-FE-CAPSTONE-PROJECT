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

  // Fetch categories on load
  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  // Save quiz history when quiz ends
  useEffect(() => {
    if (current === questions.length && questions.length > 0) {
      const history =
        JSON.parse(localStorage.getItem("quizHistory")) || []

      history.push({
        category: questions[0].category,
        score,
        total: questions.length,
        date: new Date().toLocaleDateString(),
      })

      localStorage.setItem("quizHistory", JSON.stringify(history))
    }
  }, [current, questions, score])

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
    const correct =
      questions[current].correct_answer === answer

    if (correct) setScore((s) => s + 1)

    setAnswers((prev) => [
      ...prev,
      { question: questions[current].question, correct },
    ])

    setCurrent((c) => c + 1)
  }

  const restart = () => {
    setStarted(false)
    setQuestions([])
    setCurrent(0)
    setScore(0)
    setAnswers([])
  }

  if (error) {
    return (
      <p className="text-red-600 text-center">
        {error}
      </p>
    )
  }

  if (!started) {
    return (
      <QuizStart
        categories={categories}
        onStart={startQuiz}
        loading={loading}
      />
    )
  }

  if (current >= questions.length) {
    return (
      <ScoreSummary
        score={score}
        total={questions.length}
        answers={answers}
        onRestart={restart}
      />
    )
  }

  return (
    <QuestionCard
      question={questions[current]}
      onAnswer={submitAnswer}
    />
  )
}
