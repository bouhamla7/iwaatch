import { setCache, getCache } from "./clientCache";
import axiosFetchOriginal from "./fetch";
import { getSettings } from "./settings";

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
  sortBy = "popularity.desc",
  year,
  country,
  query,
  season,
  episode,
  service,
}: Fetch) {
  const fetchMode = await getSettings()?.fetchMode;
  const request = requestID;
  // const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const baseURL = "/api/backendfetch";
  // const randomURL = process.env.NEXT_PUBLIC_RANDOM_URL;
  const requests: any = {
    latestMovie: `${baseURL}?requestID=latestMovie&language=${language}&page=${page}`, //nowPlayingMovie
    latestTv: `${baseURL}?requestID=latestTv&language=${language}&page=${page}`, // airingTodayTv
    popularMovie: `${baseURL}?requestID=popularMovie&language=${language}&page=${page}&sortBy=${sortBy}`, // current popular, so similar to latestMovie data
    popularTv: `${baseURL}?requestID=popularTv&language=${language}&page=${page}&sortBy=${sortBy}`,
    topRatedMovie: `${baseURL}?requestID=topRatedMovie&language=${language}&page=${page}`,
    topRatedTv: `${baseURL}?requestID=topRatedTv&language=${language}&page=${page}`,
    filterMovie: `${baseURL}?requestID=filterMovie&genreKeywords=${genreKeywords}&language=${language}&sortBy=${sortBy}${year != undefined ? "&year=" + year : ""}${country != undefined ? "&country=" + country : ""}&page=${page}`,
    filterTv: `${baseURL}?requestID=filterTv&genreKeywords=${genreKeywords}&language=${language}&sortBy=${sortBy}${year != undefined ? "&year=" + year : ""}${country != undefined ? "&country=" + country : ""}&page=${page}`,
    onTheAirTv: `${baseURL}?requestID=onTheAirTv&language=${language}&page=${page}`,
    trending: `${baseURL}?requestID=trending&language=${language}&page=${page}`,
    trendingMovie: `${baseURL}?requestID=trendingMovie&language=${language}&page=${page}`,
    trendingTv: `${baseURL}?requestID=trendingTv&language=${language}&page=${page}`,
    trendingMovieDay: `${baseURL}?requestID=trendingMovieDay&language=${language}&page=${page}`,
    trendingTvDay: `${baseURL}?requestID=trendingTvDay&language=${language}&page=${page}`,
    searchMulti: `${baseURL}?requestID=searchMulti&query=${query}&language=${language}&page=${page}`,
    searchKeyword: `${baseURL}?requestID=searchKeyword&query=${query}&language=${language}&page=${page}`,
    searchMovie: `${baseURL}?requestID=searchMovie&query=${query}&language=${language}&page=${page}`,
    searchTv: `${baseURL}?requestID=searchTv&query=${query}&language=${language}&page=${page}`,

    // for a ID
    movieData: `${baseURL}?id=${id}&requestID=movieData&language=${language}`,
    tvData: `${baseURL}?id=${id}&requestID=tvData&language=${language}`,
    personData: `${baseURL}?id=${id}&requestID=personData&language=${language}`,
    movieVideos: `${baseURL}?id=${id}&requestID=movieVideos&language=${language}`,
    tvVideos: `${baseURL}?id=${id}&requestID=tvVideos&language=${language}`,
    movieImages: `${baseURL}?id=${id}&requestID=movieImages`,
    tvImages: `${baseURL}?id=${id}&requestID=tvImages`,
    personImages: `${baseURL}?id=${id}&requestID=personImages`,
    movieCasts: `${baseURL}?id=${id}&requestID=movieCasts&language=${language}`,
    tvCasts: `${baseURL}?id=${id}&requestID=tvCasts&language=${language}`,
    movieReviews: `${baseURL}?id=${id}&requestID=movieReviews&language=${language}`,
    tvReviews: `${baseURL}?id=${id}&requestID=tvReviews&language=${language}`,
    movieRelated: `${baseURL}?id=${id}&requestID=movieRelated&language=${language}&page=${page}`,
    tvRelated: `${baseURL}?id=${id}&requestID=tvRelated&language=${language}&page=${page}`,
    tvEpisodes: `${baseURL}?id=${id}&season=${season}&requestID=tvEpisodes&language=${language}`,
    tvEpisodeDetail: `${baseURL}?id=${id}&season=${season}&episode=${episode}&requestID=tvEpisodeDetail&language=${language}`,
    movieSimilar: `${baseURL}?id=${id}&requestID=movieSimilar&language=${language}&page=${page}`,
    tvSimilar: `${baseURL}?id=${id}&requestID=tvSimilar&language=${language}&page=${page}`,

    // person
    personMovie: `${baseURL}?id=${id}&requestID=personMovie&language=${language}&page=${page}`,
    personTv: `${baseURL}?id=${id}&requestID=personTv&language=${language}&page=${page}`,

    // filters
    genresMovie: `${baseURL}?requestID=genresMovie&language=${language}`,
    genresTv: `${baseURL}?requestID=genresTv&language=${language}`,
    countries: `${baseURL}?requestID=countries&language=${language}`,
    languages: `${baseURL}?requestID=languages`,

    // collections
    collection: `${baseURL}?requestID=collection&id=${id}`,
    searchCollection: `${baseURL}?requestID=searchCollection&query=${query}&page=${page}`,

    // withKeywords
    withKeywordsTv: `${baseURL}?requestID=withKeywordsTv&genreKeywords=${genreKeywords}&language=${language}&sortBy=${sortBy}${year != undefined ? "&year=" + year : ""}${country != undefined ? "&country=" + country : ""}&page=${page}`,
    withKeywordsMovie: `${baseURL}?requestID=withKeywordsMovie&genreKeywords=${genreKeywords}&language=${language}&sortBy=${sortBy}${year != undefined ? "&year=" + year : ""}${country != undefined ? "&country=" + country : ""}&page=${page}`,

    // provider
    VideoProviderServices: `${baseURL}?requestID=VideoProviderServices`,
    movieVideoProvider: `${baseURL}?requestID=movieVideoProvider&id=${id}&service=${service}`,
    tvVideoProvider: `${baseURL}?requestID=tvVideoProvider&id=${id}&season=${season}&episode=${episode}&service=${service}`,

    // EXTERNAL provider
    movieExternalVideoProvider: `${baseURL}?requestID=movieExternalVideoProvider&id=${id}`,
    tvExternalVideoProvider: `${baseURL}?requestID=tvExternalVideoProvider&id=${id}&season=${season}&episode=${episode}`,
  };
  const final_request = requests[request];
  // console.log({ final_request });

  // client side caching
  const cacheKey = final_request;
  const cachedResult = await getCache(cacheKey);
  if (
    cachedResult &&
    cachedResult !== null &&
    cachedResult !== undefined &&
    cachedResult !== ""
  ) {
    return await cachedResult;
  }
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  if (
    final_request !== undefined &&
    !requestID.includes("VideoProvider") &&
    fetchMode === "client"
  ) {
    try {
      const response: any = await axiosFetchOriginal({
        requestID,
        id,
        language,
        page,
        genreKeywords,
        sortBy,
        year,
        country,
        query,
        season,
        episode,
        service,
      });
      // console.log({ response });
      if (response?.success !== false) setCache(cacheKey, response);
      return await response;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  } else if (final_request !== undefined)
    try {
      // const response = await axios.get(final_request, { withCredentials: false });
      const req: any = await fetch(final_request, options);
      const response: any = await req.json();
      console.log({ response });

      // const response=await req.json();
      if (response?.success !== false) setCache(cacheKey, response);
      return await response; // Return the resolved data from the response
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors appropriately (e.g., throw a custom error or return null)
      // throw new Error("Failed to fetch data"); // Example error handling
    }
}
