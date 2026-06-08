import Stars from "./Stars";

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

export default Movie;