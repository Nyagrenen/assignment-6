import {useState} from "react";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";
import OrderByAButton from "./components/OrderByAButton";
import OrderByBButton from "./components/OrderByBButton";

let nextId =1;

export default function MovieApplication(){
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState(null);

  const addMovie = ({title, rating}) => {
    setMovies((prev) => [...prev, {id: nextId++, title, rating}]);
  };

  const removeMovie = (id) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleSort = (mode) => {
    setSort((prev) => (prev === mode ? null : mode));
  };

  const sortedMovies = [...movies].sort((a,b) => {
    if (sort === "alpha") return a.title.localeCompare(b.title, "sv");
    if (sort === "grade") return b.rating - a.rating ;
    return 0;
  });

  return (
    <>
      <div className="container">
        <h1>Min filmlista</h1>

        <AddMovie onAdd={addMovie} />
        <h2>Filmer</h2>

        <div className="sort-controls mb-3">
          <OrderByAButton
            active={sort === "alpha"}
            onClick={() => toggleSort("alpha")}
          />
          <OrderByBButton
            active={sort === "grade"}
            onClick={() => toggleSort("grade")}
          />
        </div>
        <MovieList movies={sortedMovies} onRemove={removeMovie} />
      </div>
    </>
  );
}

