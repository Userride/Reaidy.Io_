import { useEffect, useState } from "react";

export default function MCQTest({ t, su }) {
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({ javascript: [], database: [] });
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("https://reaidy-io-qkie.onrender.com/api/questions", {
      headers: { Authorization: `Bearer ${t}` }
    })
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, [t]);

  const select = (sub, qid, optIndex) => {
    setAnswers(prev => ({
      ...prev,
      [sub]: [...prev[sub].filter(a => a.id !== qid), { id: qid, selected: optIndex }]
    }));
  };

  const submit = async () => {
    const r = await fetch("https://reaidy-io-qkie.onrender.com/api/assessment/mcq-submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`
      },
      body: JSON.stringify({ answers })
    });

    const data = await r.json();
    su(data.user);
    setResult(data);
  };

  if (!questions) return <div>Loading questions...</div>;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">📝 Skill Assessment</h2>

      {!result && Object.entries(questions).map(([sub, qs]) => (
        <div key={sub} className="mb-6">
          <h3 className="font-semibold mb-2">{sub.toUpperCase()}</h3>
          {qs.map(q => (
            <div key={q.id} className="mb-3">
              <p>{q.q}</p>
              {q.opts.map((o, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={q.id}
                    onChange={() => select(sub, q.id, i)}
                  /> {o}
                </label>
              ))}
            </div>
          ))}
        </div>
      ))}

      {!result && (
        <button className="btn" onClick={submit}>
          Submit Test
        </button>
      )}

      {result && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-3">📊 Test Result</h3>
          <p>JavaScript Score: <b>{result.score.javascript}</b></p>
          <p>Database Score: <b>{result.score.database}</b></p>

          <h4 className="text-lg font-semibold mt-4">🤖 AI Recommendation</h4>

          <p><b>JavaScript ({result.studyPlan.js.level})</b></p>
          <ul className="list-disc ml-6">
            {result.studyPlan.js.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <p className="mt-3"><b>Database ({result.studyPlan.db.level})</b></p>
          <ul className="list-disc ml-6">
            {result.studyPlan.db.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <p className="mt-6 text-green-600 font-semibold">
            ✅ Now generate your personalized roadmap
          </p>
        </div>
      )}
    </div>
  );
}
