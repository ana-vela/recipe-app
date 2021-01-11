import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [ingredient, updateIngredient] = useState([]);

  useEffect(() => {
    let url = `https://api.edamam.com/search?q=chicken&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res.hits);
        updateIngredient(res.hits);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="Wrapper">
          {ingredient.map((item) => {
            return (
              <div className="Card">
                <span>{item.recipe.label}</span>
                <img alt="recipe" src={item.recipe.image} />
                {item.recipe.ingredientLines.map((step) => (
                  <p>{step}</p>
                ))}
                <p>
                  Source:<a href={item.recipe.url}>{item.recipe.source}</a>
                </p>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
