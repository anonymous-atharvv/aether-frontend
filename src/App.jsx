import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // 🔥 Replace with your actual HF Backend URL:
  const backendURL = "https://anonymousananta-aether-backend-atharvv.hf.space/analyze";

  const analyze = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(backendURL, { text: input });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Backend error. Check logs.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        AETHER – Universal Decision Intelligence OS
      </h1>

      <div className="max-w-3xl mx-auto bg-slate-900 p-6 rounded-xl shadow-lg">
        <textarea
          className="w-full h-40 p-4 rounded-lg"
          placeholder="Describe your situation..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={analyze}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Decision"}
        </button>

        {result && (
          <div className="mt-6 space-y-4">
            <Section title="Parsed Scenario" text={result.parsed} />
            <Section title="Decision Options" text={result.options} />
            <Section title="Predicted Outcomes" text={result.outcomes} />
            <Section title="Risk Level" text={result.risk} />
            <Section title="Biases Detected" text={result.biases} />
            <Section title="Best Decision" text={result.best_decision} />
            <Section title="Action Plan" text={result.plan} />
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, text }) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <pre className="whitespace-pre-wrap text-slate-300">{text}</pre>
    </div>
  );
}

export default App;
