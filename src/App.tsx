import { useEffect, useState } from "react";
import "./App.css";
import { quotes } from "./quotes";

function App() {
  const [dailyQuote, setDailyQuote] = useState({
    quote: "",
    author: "",
    reference: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const storedDate = localStorage.getItem("date");
    const storedIndex = localStorage.getItem("quoteIndex");

    if (today !== storedDate) {
      let randomIndex = Math.floor(Math.random() * quotes.length);

      if (storedIndex !== null && randomIndex.toString() === storedIndex) {
        randomIndex = (randomIndex + 1) % quotes.length;
      }

      setDailyQuote(quotes[randomIndex]);
      localStorage.setItem("date", today);
      localStorage.setItem("quoteIndex", randomIndex.toString());
    } else {
      const lastQuote = quotes[storedIndex ? parseInt(storedIndex, 10) : 0];
      setDailyQuote(lastQuote);
    }
  }, []);

  return (
    <div>
      <blockquote>
        <span className="quote">{dailyQuote.quote}</span>
        <footer>
          {dailyQuote.author}, <cite>{dailyQuote.reference}</cite>
        </footer>
      </blockquote>
    </div>
  );
}

export default App;