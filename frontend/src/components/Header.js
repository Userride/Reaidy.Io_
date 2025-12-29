export default function Header({ u, sp }) {
    return (
        <div className="header flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-xl">

                </div>
                <div>
                    <h1 className="text-2xl font-bold">Personalized Learning Path Generator</h1>
                    <p className="text-sm opacity-90">
                        {u ? `Welcome, ${u.name}!` : "AI-Powered Learning Paths"}
                    </p>
                </div>
            </div>

            {u && (
                <div className="flex items-center space-x-6">
                    <div className="text-sm opacity-80">
                        Progress:{" "}
                        {Math.round(
                            ((u.completedTopics?.length || 0) /
                                (u.roadmap?.length || 1)) *
                            100
                        )}
                        %
                    </div>

                    <button
                        onClick={() => sp("mcq")}
                        className="
    relative overflow-hidden
    px-6 py-3
    rounded-2xl
    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
    text-white font-semibold text-sm
    shadow-xl
    transition-all duration-300
    hover:scale-105 hover:shadow-pink-400/50
    active:scale-95
    flex items-center gap-2
  "
                    >
                        <span className="text-lg">📝</span>
                        <span>Take Skill Quiz</span>

                        {/* glow effect */}
                        <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 hover:opacity-100 transition"></span>
                    </button>

                </div>
            )}
        </div>
    );
}
