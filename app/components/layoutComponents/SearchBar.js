"use client";

import React, { useState, useRef } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  //for deponcing search logic
  const debounceTimeout = useRef(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);

    // Clear previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout
    debounceTimeout.current = setTimeout(() => {
      onSearch(e.target.value);
    }, 300);
  };

  return (
    <div className="w-full rounded-full bg-blue-200">
      <input
        value={query}
        onChange={handleInputChange}
        className="w-full px-3 py-5 bg-gray-200 rounded-full border border-gray-300 focus:border active:border outline-none focus:border-red-300 active:border-red-300"
        id="SearchBar"
        name="SearchBar"
        type="text"
        placeholder="Search movies ..."
      />
    </div>
  );
};

export default SearchBar;
