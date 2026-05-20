import {useState} from "react";
//visar stjärnor baserat på betyg
function Stars({rating}) {
  return (
    <span className="stars">
      {Array.from({ length: rating}, (_, i) => (
        <img key={i} src="/images/star.png" alt="star" className="star-icon" />
      ))}
    </span>
  );
}

//motsvarar ett <li>-element med data grade, data title, .movie-title, .stars och .delete-movie-icon
function Movie({movie, onRemove}) {
  return (
    <li 
      className="movie-item"
      data-grade={movie.rating}
      data-title={movie.title}
    >
      <span className="movie-title">{movie.title}</span>
      <Stars rating={movie.rating} />
      <img 
        src="/images/delete.png"
        alt="Ta bort film"
        className="delete-movie-icon"
        onClick={() => onRemove(movie.id)}
      />
    </li>
  );
}

//motsvarar <ul id="movies">
function MovieList({ movies, onRemove}) {
  return (
    <ul id="movies">
      {movies.length === 0 ? (
        <li className="empty-msg">Inga filmer tillagda</li>
      ): (
        movies.map((m) => (
          <Movie key={m.id} movie={m} onRemove={onRemove} />
        ))
      )}
    </ul>
  );
}

//motsvarar <form id="add-movie-form"> med fieldset/legend, title-field, rating-field och submit-knapp
//validering sker med alert()
function AddMovie({onAdd}){
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("0");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const parsedRating = parseInt(rating);

    if (trimmedTitle === "") {
      alert("Du måste skriva en titel");
      return;
    }
    if (parsedRating === 0){
      alert("Du måste välja ett betyg");
      return
    }

    onAdd({title: trimmedTitle, rating:parsedRating});

    //återställ formuläret
    setTitle("");
    setRating("0");
  };

  return(
    <form id="add-movie" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Lägg till en film</legend>
        <label htmlFor="title-field">Titel:</label>
        <input type="text"
        id="title-field"
        className="form-control"
        value={title}
        onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="rating-field">Betyg:</label>
        <select id="rating-field"
        className="form-control"
        value={rating}
        onChange={(e) => setRating(e.target.value)}>
          <option value="0">Välj betyg här...</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <input type="submit"
        className="btn btn-success mt-3"
        value= "Spara film" />
      </fieldset>
    </form>
  );
}

//sortera knappar
function OrderByAButton({active, onClick}){
  return(
    <button className={"btn btn-outline-secondary btn-sm me-2" + (active ? " active" : "")}
    onClick={onClick}>
      Sortera A-Z
    </button>
  );
}

function OrderByBButton ({active, onClick}) {
  return (
    <button className={"btn btn-outline-secondary btn-sm" + (active ? " active" : "")}
    onClick={onClick}>
      Sortera efter betyg
    </button>
  );
}

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

