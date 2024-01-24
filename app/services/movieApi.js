export const searchMovies = async (query, page = 1) => {
  let apiUrl = new URL("https://api.themoviedb.org/3/search/movie");

  if (query) {
    apiUrl.searchParams.set("query", query);
    apiUrl.searchParams.set("page", page);
  } else {
    apiUrl = new URL("https://api.themoviedb.org/3/discover/movie?");
  }
  apiUrl.searchParams.set("api_key", process.env.NEXT_PUBLIC_APIKEY);
  try {
    const response = await fetch(`${apiUrl}`);
    const data = await response.json();

    if (response.ok) {
      return data.results || [];
    } else {
      throw new Error(data.status_message || "Failed to fetch movies");
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};

export const getMovieDetails = async (id) => {
  const apiUrl = new URL(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  );
  apiUrl.searchParams.set("api_key", process.env.NEXT_PUBLIC_APIKEY);

  try {
    const response = await fetch(`${apiUrl}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.status_message || "Failed to fetch movie");
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Failed to fetch movie");
  }
};
