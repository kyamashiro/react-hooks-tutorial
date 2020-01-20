import React, {useState, useEffect} from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  const render = () => {
    if (loading && !errorMessage) {
      return <span>loading...</span>;
    }

    if (errorMessage) {
      return <div className="errorMessage">{errorMessage}</div>;
    } else {
      return movies.map((movie, index) => <Movie key={`${index}-${movie.Title}`} movie={movie} />);
    }
  };

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies.</p>
      <div className="movies">{render()}</div>
    </div>
  );
}

export default App;
