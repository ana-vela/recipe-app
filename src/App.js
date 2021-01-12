import "./App.css";
import { useState } from "react";
// import { getSuggestedQuery } from "@testing-library/react";

function App() {
  const [query, setQuery] = useState("");
  const [ingredients, updateIngredients] = useState([]);

  const searchIngredients = async (e) => {
    e.preventDefault();
    let url = `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res.hits);
        updateIngredients(res.hits);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="Wrapper">
          <div>
            <form className="form" onSubmit={searchIngredients}>
              <label className="label" htmlFor="query">
                update Ingredient
              </label>
              <input
                className="input"
                type="text"
                name="query"
                placeholder="eggs"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="button" type="submit">
                Search
              </button>
            </form>
          </div>
          {ingredients.map((ingredient) => {
            return (
              <div className="Card">
                <span>{ingredient.recipe.label}</span>
                <img alt="recipe" src={ingredient.recipe.image} />
                {ingredient.recipe.ingredientLines.map((step) => (
                  <p>{step}</p>
                ))}
                <p>
                  Source:
                  <a href={ingredient.recipe.url}>{ingredient.recipe.source}</a>
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
