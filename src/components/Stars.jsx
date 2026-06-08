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

export default Stars;
