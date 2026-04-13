import { useState } from "react";
import "./App.css";
import UrlForm from "./components/UrlForm";
import ResultCard from "./components/ResultCard";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="app-wrapper">
      <h1>🔗 URL Shortener</h1>
      <UrlForm setResult={setResult} />
      <ResultCard result={result} />
    </div>
  );
}

export default App;