import { useEffect, useState } from "react";
import { Movie_API_URL } from "./Api/movieapi.js";
import MovieCard from "./Movies/MovieCard.jsx";
import SearchIcon from "./search.svg";
import axios from "axios";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    try {
      const { data } = await axios(`${Movie_API_URL}&s=${title}`);
      setMovies(data.Search);
    } catch (error) {
      console.error("Error in API call:", error?.message);
    }
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  const searchChangeButton = (e) => {
    setSearchTerm(e.target.value);
  };
  const imgClick = () => {
    searchMovies(searchTerm);
  };

  return (
    <>
      <div className="app">
        <h1>Movie Search App</h1>
        <div className="search">
          <input
            placeholder="Search for a Movie here..."
            value={searchTerm}
            onChange={searchChangeButton}
          />
          <img src={SearchIcon} alt="search" onClick={imgClick} />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies Found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
