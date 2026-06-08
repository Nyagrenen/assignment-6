import Movie from "./Movie";

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

export default MovieList;