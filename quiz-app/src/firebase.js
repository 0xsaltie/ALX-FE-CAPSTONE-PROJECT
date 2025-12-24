import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCah64rsP8sMg0MSOQUyxgaHpApHHwykHY",
  authDomain: "quiz-app-40720.firebaseapp.com",
  projectId: "quiz-app-40720",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
