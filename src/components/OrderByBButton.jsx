//sortera efter betyg
function OrderByBButton ({active, onClick}) {
  return (
    <button className={"btn btn-outline-secondary btn-sm" + (active ? " active" : "")}
    onClick={onClick}>
      Sortera efter betyg
    </button>
  );
}

export default OrderByBButton