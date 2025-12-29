import { useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Quiz from "./components/Quiz";        // dropdown skill quiz
import MCQTest from "./components/MCQTest";  // MCQ assessment
import Roadmap from "./components/Roadmap";
import "./styles/main.css";

export default function App() {
  const [u, su] = useState(null);
  const [t, st] = useState(null);
  const [page, sp] = useState("login"); 
  // pages: login | signup | dashboard | mcq

  console.log("🎯 App:", { user: u?.name, token: !!t, page });

  /* ======================
     AUTH SCREENS
  ====================== */
  if (!u) {
    return (
      <>
        <Header />
        {page === "login" ? (
          <Login su={su} st={st} sp={sp} />
        ) : (
          <Signup sp={sp} />
        )}
      </>
    );
  }

  /* ======================
     LOGGED IN UI
  ====================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <Header u={u} sp={sp} />

      <div className="container max-w-6xl mx-auto px-6 py-12">
        {/* MCQ PAGE */}
        {page === "mcq" && (
          <>
            <MCQTest t={t} su={su} />
            <div className="text-center mt-8">
              <button
                className="text-blue-600 font-semibold"
                onClick={() => sp("dashboard")}
              >
                ← Back to Dashboard
              </button>
            </div>
          </>
        )}

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <>
            {/* Skill dropdown quiz (optional) */}
            <div className="mb-12">
              <Quiz t={t} su={su} />
            </div>

            {/* Roadmap */}
            <Roadmap u={u} t={t} su={su} />
          </>
        )}
      </div>
    </div>
  );
}
