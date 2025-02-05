import { useState } from "react";
import { addWordToHistory } from "../lib/addWordToHistory";

const TestAddWordToHistoryPage = () => {
  const [wordId, setWordId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!wordId.trim()) {
      setMessage("Please enter a word ID.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await addWordToHistory(wordId);
      console.log(response);
      setMessage("Word successfully added to history!");
    } catch (error) {
      setMessage("Failed to add word to history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Add Word to History</h2>
      <input
        type="text"
        placeholder="Enter Word ID"
        value={wordId}
        onChange={(e) => setWordId(e.target.value)}
        className="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } dark:bg-blue-700 dark:hover:bg-blue-800`}
      >
        {loading ? "Adding..." : "Add to History"}
      </button>
      {message && <p className="text-sm text-gray-700 dark:text-gray-400">{message}</p>}
    </div>
  );
};

export { TestAddWordToHistoryPage };
