import React, {useReducer, useEffect} from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

/**
 * Reducer
 * dispatch({
 *  type: "SEARCH_MOVIES_SUCCESS",
 *  payload: jsonResponse.Search
 * });
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // デフォルトの画面表示
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        // action
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      });
  }, []);

  // 検索結果
  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  };

  const {movies, errorMessage, loading} = state;

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
};

export default App;
