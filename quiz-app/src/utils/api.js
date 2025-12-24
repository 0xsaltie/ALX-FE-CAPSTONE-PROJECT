export const fetchCategories = async () => {
  const res = await fetch("https://opentdb.com/api_category.php")
  const data = await res.json()
  return data.trivia_categories
}

export const fetchQuestions = async ({ amount, category, difficulty }) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
  const res = await fetch(url)
  const data = await res.json()
  return data.results
}
