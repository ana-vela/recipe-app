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
        <h1>What's Cookin'?</h1>

        <div>
          <form className="form" onSubmit={searchIngredients}>
            <label className="label" htmlFor="query"></label>
            <input
              className="input"
              type="text"
              name="query"
              placeholder=" search for recipes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="button" type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
      <div>
        {ingredients.map((ingredient) => {
          return (
            <div className="Card">
              <div className="flip-card">
                <div className="card-inner">
                  <div className="front">
                    <div className="recipeTitle">
                      <span>{ingredient.recipe.label}</span>
                    </div>
                    <img alt="recipe" style={{width:"30px;"}}src={ingredient.recipe.image} />
                  </div>
                  <div className="back">
                    <h2>Ingredients</h2>
                    {ingredient.recipe.ingredientLines.map((step) => (
                      <p>{step}</p>
                    ))}

                    <p>
                      <a href={ingredient.recipe.url}>
                        <button>See Full Recipe</button>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
