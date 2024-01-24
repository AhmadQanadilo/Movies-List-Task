"use client";
import { useEffect, useState } from "react";
import { searchMovies } from "./services/movieApi";
import SearchBar from "./components/layoutComponents/SearchBar";
import MovieList from "./components/MoviesComponents/MovieList";
import Pagination from "./components/layoutComponents/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(
    JSON.parse(localStorage.getItem("searchQuery")) || null
  );
  const [faviorateList, setFaviorateList] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [activeTab, setActiveTab] = useState("search");

  const handleSearch = async (q) => {
    setSearchQuery(q || null);
    try {
      const results = await searchMovies(q);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching movies:", error);
      toast.error("Error searching movies. Please try again.", {
        position: "top-right",
      });
    }
  };

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);
    try {
      const results = await searchMovies(searchQuery, newPage);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching page:", error);
      toast.error("Error fetching page. Please try again.", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    handleSearch(searchQuery || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(faviorateList));
  }, [faviorateList]);

  useEffect(() => {
    localStorage.setItem("searchQuery", JSON.stringify(searchQuery));
  }, [searchQuery]);

  const toggleFav = (movie) => {
    const isMovieInFavorites = faviorateList.some(
      (favMovie) => favMovie.id === movie.id
    );

    if (isMovieInFavorites) {
      const updatedFavorites = faviorateList.filter(
        (favMovie) => favMovie.id !== movie.id
      );
      setFaviorateList(updatedFavorites);
    } else {
      setFaviorateList([...faviorateList, movie]);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className="flex flex-col gap-5 pt-8 relative">
      <ToastContainer autoClose={false} />

      <div className="flex justify-center mb-4">
        <button
          className={`px-5 py-3 border-b text-lg font-medium ${
            activeTab === "search"
              ? " border-red-500 text-red-500"
              : "border-gray-300 text-gray-700"
          }`}
          onClick={() => handleTabChange("search")}
        >
          Search Movies
        </button>
        <button
          className={`px-5 py-3 border-b text-lg font-medium ${
            activeTab === "favorites"
              ? " border-red-500 text-red-500"
              : "border-gray-300 text-gray-700"
          }`}
          onClick={() => handleTabChange("favorites")}
        >
          View Favorites
        </button>
      </div>

      {activeTab === "search" && (
        <div>
          <SearchBar onSearch={handleSearch}></SearchBar>
          <MovieList
            movies={searchResults}
            faviorateList={faviorateList}
            toggleFav={toggleFav}
          />
          {searchResults.length > 0 && (
            <Pagination
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              hasNextPage={true}
            />
          )}
        </div>
      )}

      {activeTab === "favorites" && (
        <div>
          <h2>Favorites</h2>
          <MovieList
            movies={faviorateList}
            faviorateList={faviorateList}
            toggleFav={toggleFav}
          />
        </div>
      )}
    </main>
  );
}
