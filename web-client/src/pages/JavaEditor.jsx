import { useState } from "react"
import axios from "axios"
import "../App.css"

export default function JavaEditor() {
  const [code, setCode] = useState(`public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Java!");
  }
}`)
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRunCode = async () => {
    setLoading(true)
    setOutput("Running...")

    try {
      const response = await axios.post("http://localhost:5000/run-java", { code })
      setOutput(response.data.output)
    } catch (err) {
      setOutput("Error running code: " + err.message)
    }

    setLoading(false)
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">Java Code Editor</h1>

      <div className="flex flex-col md:flex-row gap-4 h-[70vh]">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg shadow-lg overflow-hidden min-w-[300px] min-h-[300px] resize-x">
          <div className="p-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold text-center">Java Input</div>
          <textarea
            className="flex-1 w-full p-3 font-mono text-base border-0 outline-none bg-transparent focus:bg-white focus:ring-2 focus:ring-blue-400 transition-all duration-200 overflow-auto resize-none"
            style={{ minHeight: 0 }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
          <div className="p-2 bg-gradient-to-r from-pink-400 to-purple-400 text-right">
            <button
              onClick={handleRunCode}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-5 py-2 rounded shadow hover:from-pink-500 hover:to-blue-500 transition font-bold disabled:opacity-60"
            >
              {loading ? "Running..." : "Run Code"}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-green-50 via-yellow-50 to-pink-50 rounded-lg shadow-lg overflow-hidden min-w-[300px] min-h-[300px] resize-x">
          <div className="p-2 bg-gradient-to-r from-green-400 to-yellow-400 text-white font-bold text-center">Output</div>
          <div className="flex-1 overflow-auto p-3">
            {output && (
              <div className={`rounded text-base font-mono px-2 py-2 whitespace-pre-wrap break-words ${output.includes("Error") ? "bg-red-100 text-red-700 border-l-4 border-red-400" : "bg-green-100 text-green-700 border-l-4 border-green-400"}`}>
                {output}
              </div>
            )}
            {!output && <div className="text-gray-400 italic">Output will appear here...</div>}
          </div>
        </div>
      </div>
    </div>
  )
}