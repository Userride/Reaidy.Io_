import { useState } from "react";

export default function Signup({ sp }) {
  const [n, sn] = useState("");
  const [e, se] = useState("");
  const [p, spw] = useState("");
  const [loading, setLoading] = useState(false);

  const s = async () => {
    setLoading(true);
    try {
      await fetch("https://reaidy-io-qkie.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, email: e, password: p })
      });
      sp("login");
    } catch {
      alert("Signup failed");
    }
    setLoading(false);
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh]">
      <div className="card w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Create Account
        </h2>

        <div className="space-y-4">
          <input
            className="input"
            placeholder="Full Name"
            value={n}
            onChange={x => sn(x.target.value)}
          />

          <input
            className="input"
            placeholder="Email"
            value={e}
            onChange={x => se(x.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={p}
            onChange={x => spw(x.target.value)}
          />

          <button
            className="btn text-lg py-3 w-full"
            onClick={s}
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 mb-3">
            Already have an account?
          </p>

          <button
            onClick={() => sp("login")}
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
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
