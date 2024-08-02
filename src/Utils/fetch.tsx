import axios from "axios";

interface Fetch {
  requestID: any;
  id?: string | null;
  language?: string;
  page?: number;
  genreKeywords?: string;
  sortBy?: string;
  year?: number;
  country?: string;
  query?: string;
  season?: number;
  episode?: number;
  service?: string;
}
export default async function axiosFetch({
  requestID,
  id,
  language = "en-US",
  page = 1,
  genreKeywords,
  sortBy,
  year,
  country,
  query,
  season,
  episode,
  service,
}: Fetch) {
  const request = requestID;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const baseURL = process.env.NEXT_PUBLIC_TMDB_API;
  const randomURL = process.env.NEXT_PUBLIC_RANDOM_URL;
  const ProviderURL = process.env.NEXT_PUBLIC_PROVIDER_URL;
  const ProviderENV = process.env.NEXT_PUBLIC_PROVIDER_ENV;
  const ExternalProviderURL = process.env.NEXT_PUBLIC_EXTERNAL_PROVIDER_URL;
  const requests: any = {
    latestMovie: `${baseURL}/movie/now_playing?language=${language}&page=${page}&api_key=${API_KEY}`, //nowPlayingMovie
    latestTv: `${baseURL}/tv/airing_today?language=${language}&page=${page}&api_key=${API_KEY}`, // airingTodayTv
    popularMovie: `${baseURL}/movie/popular?language=${language}&page=${page}&sort_by=${sortBy}&api_key=${API_KEY}`, // current popular, so similar to latestMovie data
    popularTv: `${baseURL}/tv/popular?language=${language}&page=${page}&sort_by=${sortBy}&api_key=${API_KEY}`,
    topRatedMovie: `${baseURL}/movie/top_rated?language=${language}&page=${page}&api_key=${API_KEY}`,
    topRatedTv: `${baseURL}/tv/top_rated?language=${language}&page=${page}&api_key=${API_KEY}`,
    filterMovie: `${baseURL}/discover/movie?with_genres=${genreKeywords}&language=${language}&sort_by=${sortBy}${year != undefined ? "&year=" + year : ""}${country != undefined ? "&with_origin_country=" + country : ""}&page=${page}&api_key=${API_KEY}`,
    filterTv: `${baseURL}/discover/tv?with_genres=${genreKeywords}&language=${language}&sort_by=${sortBy}${year != undefined ? "&first_air_date_year=" + year : ""}${country != undefined ? "&with_origin_country=" + country : ""}&page=${page}&with_runtime.gte=1&api_key=${API_KEY}`,
    onTheAirTv: `${baseURL}/tv/on_the_air?language=${language}&page=${page}&api_key=${API_KEY}`,
    trending: `${baseURL}/trending/all/day?language=${language}&page=${page}&api_key=${API_KEY}`,
    trendingMovie: `${baseURL}/trending/movie/week?language=${language}&page=${page}&api_key=${API_KEY}`,
    trendingTv: `${baseURL}/trending/tv/week?language=${language}&page=${page}&api_key=${API_KEY}`,
    trendingMovieDay: `${baseURL}/trending/movie/day?language=${language}&page=${page}&api_key=${API_KEY}`,
    trendingTvDay: `${baseURL}/trending/tv/day?language=${language}&page=${page}&api_key=${API_KEY}`,
    searchMulti: `${baseURL}/search/multi?query=${query}&language=${language}&page=${page}&api_key=${API_KEY}`,
    searchKeyword: `${baseURL}/search/keyword?query=${query}&language=${language}&page=${page}&api_key=${API_KEY}`,
    searchMovie: `${baseURL}/search/movie?query=${query}&language=${language}&page=${page}&api_key=${API_KEY}`,
    searchTv: `${baseURL}/search/tv?query=${query}&language=${language}&page=${page}&api_key=${API_KEY}`,

    // for a ID
    movieData: `${baseURL}/movie/${id}?language=${language}&api_key=${API_KEY}`,
    tvData: `${baseURL}/tv/${id}?language=${language}&api_key=${API_KEY}`,
    personData: `${baseURL}/person/${id}?language=${language}&api_key=${API_KEY}`,
    movieVideos: `${baseURL}/movie/${id}/videos?language=${language}&api_key=${API_KEY}`,
    tvVideos: `${baseURL}/tv/${id}/videos?language=${language}&api_key=${API_KEY}`,
    movieImages: `${baseURL}/movie/${id}/images?api_key=${API_KEY}`,
    tvImages: `${baseURL}/tv/${id}/images?api_key=${API_KEY}`,
    personImages: `${baseURL}/person/${id}/images?api_key=${API_KEY}`,
    movieCasts: `${baseURL}/movie/${id}/credits?language=${language}&api_key=${API_KEY}`,
    tvCasts: `${baseURL}/tv/${id}/credits?language=${language}&api_key=${API_KEY}`,
    movieReviews: `${baseURL}/movie/${id}/reviews?language=${language}&api_key=${API_KEY}`,
    tvReviews: `${baseURL}/tv/${id}/reviews?language=${language}&api_key=${API_KEY}`,
    movieRelated: `${baseURL}/movie/${id}/recommendations?language=${language}&page=${page}&api_key=${API_KEY}`,
    tvRelated: `${baseURL}/tv/${id}/recommendations?language=${language}&page=${page}&api_key=${API_KEY}`,
    tvEpisodes: `${baseURL}/tv/${id}/season/${season}?language=${language}&api_key=${API_KEY}`,
    tvEpisodeDetail: `${baseURL}/tv/${id}/season/${season}/episode/${episode}?language=${language}&api_key=${API_KEY}`,
    movieSimilar: `${baseURL}/movie/${id}/similar?language=${language}&page=${page}&api_key=${API_KEY}`,
    tvSimilar: `${baseURL}/tv/${id}/similar?language=${language}&page=${page}&api_key=${API_KEY}`,

    // person
    personMovie: `${baseURL}/person/${id}/movie_credits?language=${language}&page=${page}&api_key=${API_KEY}`,
    personTv: `${baseURL}/person/${id}/tv_credits?language=${language}&page=${page}&api_key=${API_KEY}`,

    // filters
    genresMovie: `${baseURL}/genre/movie/list?language=${language}&api_key=${API_KEY}`,
    genresTv: `${baseURL}/genre/tv/list?language=${language}&api_key=${API_KEY}`,
    countries: `${baseURL}/configuration/countries?language=${language}&api_key=${API_KEY}`,
    languages: `${baseURL}/configuration/languages&api_key=${API_KEY}`,

    // random
    random: `${randomURL}`,

    // collections
    collection: `${baseURL}/collection/${id}?language=${language}&api_key=${API_KEY}`,
    searchCollection: `${baseURL}/search/collection?query=${query}&language=${language}&page=${page}&api_key=${API_KEY}`,

    // withKeywords
    withKeywordsTv: `${baseURL}/discover/tv?with_keywords=${genreKeywords}&language=${language}&sort_by=${sortBy}${year != undefined ? "&first_air_date_year=" + year : ""}${country != undefined ? "&with_origin_country=" + country : ""}&page=${page}&air_date.lte=${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}${sortBy === "first_air_date.desc" ? "&with_runtime.gte=1" : null}&api_key=${API_KEY}`,
    withKeywordsMovie: `${baseURL}/discover/movie?with_keywords=${genreKeywords}&language=${language}&sort_by=${sortBy}${year != undefined ? "&first_air_date_year=" + year : ""}${country != undefined ? "&with_origin_country=" + country : ""}&page=${page}&release_date.lte=${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}&with_runtime.gte=1&api_key=${API_KEY}`,

    // provider
    VideoProviderServices:
      ProviderENV === "cloudflare"
        ? `${ProviderURL}/api/providers`
        : `${ProviderURL}/providers`,
    movieVideoProvider:
      ProviderENV === "cloudflare"
        ? `${ProviderURL}/api/provider?provider=${service}&id=${id}`
        : `${ProviderURL}/${service}/movie/${id}`,
    tvVideoProvider:
      ProviderENV === "cloudflare"
        ? `${ProviderURL}/api/provider?provider=${service}&id=${id}&season=${season}&episode=${episode}`
        : `${ProviderURL}/${service}/tv/${id}/${season}/${episode}`,

    // External provider
    movieExternalVideoProvider: `${ExternalProviderURL}/${id}?s=0&e=0`,
    tvExternalVideoProvider: `${ExternalProviderURL}/${id}?s=${season}e=${episode}&e=0`,
  };
  var final_request = requests[request];
  final_request =
    "https://proxy.valhallastream.us.kg/?destination=" +
    encodeURI(final_request);
  console.log({ final_request });

  try {
    const response: any = await fetch(`${final_request}`);
    console.log({ response });
    return await response?.data; // Return the resolved data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors appropriately (e.g., throw a custom error or return null)
    // throw new Error("Failed to fetch data"); // Example error handling
  }
}
