import React, { useContext } from "react";
import GlobalState from "../../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  setSearch("");

  return (
    <div className="filter_menu">
      <input
        type="text"
        value={search}
        placeholder="Enter your search!"
        onChange={handleCategory}
      />
    </div>
  );
}

export default Filters;
