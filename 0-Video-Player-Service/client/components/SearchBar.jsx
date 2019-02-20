import React from "react";

function SearchBar(props) {
  return (
    <div className="searchBar">
      <form >
        <input id="searchInputField" type="text" onChange={props.handleSearchInput} placeholder="Search" />
      </form>
    </div>
  );
}


export default SearchBar;


