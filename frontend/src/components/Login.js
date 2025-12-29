import { useState } from "react";

export default function Login({ su, st, sp }) {
  const [e, se] = useState("demo@learning.com");
  const [p, spw] = useState("password123");
  const [loading, setLoading] = useState(false);

  const l = async () => {
    setLoading(true);
    try {
      const r = await fetch("https://reaidy-io-qkie.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: e, password: p })
      });

      const d = await r.json();

      if (r.ok) {
        su(d.user);
        st(d.token);
      } else {
        alert(d.msg || "Login failed");
      }
    } catch (err) {
      alert("Server error");
    }
    setLoading(false);
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh]">
      <div className="card w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <div className="space-y-4">
          <input
            className="input"
            placeholder="demo@learning.com"
            value={e}
            onChange={x => se(x.target.value)}
            onKeyPress={x => x.key === "Enter" && l()}
          />

          <input
            className="input"
            type="password"
            placeholder="password123"
            value={p}
            onChange={x => spw(x.target.value)}
            onKeyPress={x => x.key === "Enter" && l()}
          />

          <button
            className="btn text-lg py-3 w-full"
            onClick={l}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* DEMO INFO */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm font-medium text-blue-800">
            💡 Demo Account
          </p>
          <p className="text-xs text-blue-700">
            demo@learning.com / password123
          </p>
        </div>

        {/* SIGNUP BUTTON */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 mb-3">
            Don’t have an account?
          </p>

          <button
            onClick={() => sp("signup")}
            className="
              px-6 py-2
              bg-blue-600 text-white
              rounded-xl
              font-semibold
              shadow-md
              hover:bg-blue-700
              hover:shadow-lg
              transition
              cursor-pointer
            "
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
