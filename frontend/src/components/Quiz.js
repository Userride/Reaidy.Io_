import { useState } from "react";

export default ({ t, su }) => {
  const [js, sj] = useState("beginner");
  const [db, sd] = useState("beginner");
  const [loading, setLoading] = useState(false);

  const submitQuiz = async () => {
    console.log("🔑 Token:", t?.substring(0, 20) + "...");
    console.log("📤 Sending:", { skills: { js, db } });
    
    setLoading(true);
    try {
      const r = await fetch("https://reaidy-io-qkie.onrender.com/api/assessment/submit", {  
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${t}`
        },
        body: JSON.stringify({ skills: { js, db } })
      });
      
      console.log("📥 Status:", r.status);
      const data = await r.json();
      console.log("📥 Data:", data);
      
      if (r.ok) {
        su(data.user);
      } else {
        alert(data.msg || "Error");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* QUIZ */}
      <div className="lg:col-span-1">
        <div className="card p-8 shadow-2xl">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            🎯 Skill Assessment
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl mb-8 shadow-xl">
            <div>
              <label className="block text-xl font-bold mb-4 text-gray-800">JavaScript</label>
              <select className="w-full p-5 border-2 border-gray-200 rounded-2xl text-xl font-semibold bg-white shadow-md focus:ring-4 focus:ring-blue-300" value={js} onChange={e=>sj(e.target.value)}>
                <option>🥉 Beginner</option>
                <option>🥈 Intermediate</option>
                <option>🥇 Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-xl font-bold mb-4 text-gray-800">Database</label>
              <select className="w-full p-5 border-2 border-gray-200 rounded-2xl text-xl font-semibold bg-white shadow-md focus:ring-4 focus:ring-blue-300" value={db} onChange={e=>sd(e.target.value)}>
                <option>🥉 Beginner</option>
                <option>🥈 Intermediate</option>
                <option>🥇 Advanced</option>
              </select>
            </div>
          </div>

          <button className={`w-full text-xl py-6 rounded-3xl font-bold shadow-2xl transition-all ${loading||!t?'bg-gray-400 cursor-not-allowed':'bg-gradient-to-r from-emerald-500 to-blue-600 hover:shadow-purple-500 hover:-translate-y-2 hover:from-emerald-600 hover:to-blue-700'}`} onClick={submitQuiz} disabled={loading||!t}>
            {loading?"🎯 Generating AI Roadmap...":"🚀 Generate Learning Path"}
          </button>

          <p className={`mt-6 text-center text-lg font-bold ${t?'text-emerald-600':'text-red-500'}`}>
            {t?"✅ READY! Click Generate":"⚠️ Login first"}
          </p>
        </div>
      </div>
      
      {/* INFO */}
      <div className="lg:col-span-1">
        <div className="card p-8 h-full bg-gradient-to-br from-indigo-50 to-purple-50 shadow-2xl">
          <h3 className="text-3xl font-bold mb-6 text-indigo-800">✨ What happens next?</h3>
          <div className="space-y-4 text-lg leading-relaxed">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">1️⃣</span>
              <span>Select your skill levels above</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">2️⃣</span>
              <span>Click "Generate Learning Path"</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">3️⃣</span>
              <span>AI creates your personal roadmap ↓</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">4️⃣</span>
              <span>Interactive graph + PDF download</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
