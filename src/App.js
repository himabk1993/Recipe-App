import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe'

const App = () => {

  const APP_ID = '70bcab90';
  const APP_KEY = '4afe4e1866d6cf467f5156a1b33a680f';


  //  const [counter, setCounter] = useState(0);

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');


    useEffect ( () => {
      GET_RECIPES();
    },[query] )

    const GET_RECIPES = async () => { 
      const RESPONSE =  await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const DATA = await RESPONSE.json();
      setRecipes(DATA.hits);
    }

    const updateSearch = e =>{
      setSearch(e.target.value);
    }

    const getSearch = e =>{
      e.preventDefault();
      setQuery(search);
      setSearch(''); 
    }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form"  >
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit" >
        Search
        </button>
        </form>
        <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
          key = {recipe.recipe.label} 
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          ingredients = {recipe.recipe.ingredients}
          image={recipe.recipe.image} />
        ))}
        </div>
    </div>
  );
}

export default App;
