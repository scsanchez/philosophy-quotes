import { useEffect, useState } from "react";
import "./App.css";
import { quotes } from "./quotes";

function App() {
  const [dailyQuote, setDailyQuote] = useState({
    quote: "",
    author: "",
    reference: "",
  });
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const storedDate = localStorage.getItem("date");
    const storedIndex = localStorage.getItem("quoteIndex");
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    setFavorites(storedFavorites);

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

  const addToFavorites = () => {
    const isFavorite = favorites.some(
      (fav) =>
        fav.quote === dailyQuote.quote && fav.author === dailyQuote.author);

    if (!isFavorite) {
      const newFavorites = [...favorites, dailyQuote];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites); 
  };

  return (
    <div>
      <blockquote>
        <p>{dailyQuote.quote}</p>
        <footer>
          {dailyQuote.author}, <cite>{dailyQuote.reference}</cite>
        </footer>
      </blockquote>
      <button onClick={addToFavorites}>Add to Favorites</button>
      <button onClick={toggleFavorites}>
        {showFavorites ? "Hide Favorites" : "Show Favorites"}
      </button>
      {showFavorites && (
        <div>
          <h2>Favorites</h2>
          <ul>
            {favorites.map((fav, index) => (
              <li key={index}>
                <blockquote>
                  <p>{fav.today}</p>
                  <p>{fav.quote}</p>
                  <footer>
                    {fav.author}, <cite>{fav.reference}</cite>
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
