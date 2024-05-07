import { useEffect, useState } from "react";
import "./quote.css";

function Quote() {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://www.jcquotes.com/api/quotes/random");
      const data = await res.json();

      setQuote(data.text);
      setAuthor(data.rawText.slice(-11));
    }
    fetchData();
  }, []);

  return (
    <div className="quote">
      <p className="text">{quote}</p>
      <p className="author">~{author}</p>
    </div>
  );
}

export default Quote;
