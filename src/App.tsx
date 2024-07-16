import { useEffect, useState } from "react";
import "./App.css";
import { quotes } from "./quotes";
import { TypeAnimation } from "react-type-animation";

const getInitialDailyQuote = () => {
  const today = new Date().toISOString().slice(0, 10);
  const storedDate = localStorage.getItem("date");
  const storedIndex = localStorage.getItem("quoteIndex");
  let initialQuote = { quote: "", author: "", reference: "" };

  if (today === storedDate && storedIndex !== null) {
    initialQuote = quotes[parseInt(storedIndex, 10)];
  } else {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    initialQuote = quotes[randomIndex];
    
    localStorage.setItem("date", today);
    localStorage.setItem("quoteIndex", randomIndex.toString());
  }

  return initialQuote;
};

function App() {
  const [dailyQuote, setDailyQuote] = useState(getInitialDailyQuote);

  const sequenceQuote = [
    dailyQuote.quote,
    () => {
      console.log("Sequence completed");
    },
  ];

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
    }
  }, []);

  return (
    <div>
      <blockquote>
        {" "}
        <span className="quote">
          <TypeAnimation
            sequence={sequenceQuote}
            wrapper="span"
            cursor={true}
            speed={75}
            style={{ fontSize: "2em", display: "inline-block" }}
          />
        </span>
      </blockquote>
      <footer>
        {dailyQuote.author}, <cite>{dailyQuote.reference}</cite>
      </footer>
    </div>
  );
}

export default App;
