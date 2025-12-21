import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <input
      placeholder="Search users"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;
