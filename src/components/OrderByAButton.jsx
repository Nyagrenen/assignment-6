//sortera knappar
function OrderByAButton({active, onClick}){
  return(
    <button className={"btn btn-outline-secondary btn-sm me-2" + (active ? " active" : "")}
    onClick={onClick}>
      Sortera A-Z
    </button>
  );
}

export default OrderByAButton;