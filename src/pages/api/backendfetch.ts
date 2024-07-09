import type { NextApiRequest, NextApiResponse } from "next";
import axiosFetch from "@/Utils/fetch";
import { getCache, setCache } from "@/Utils/cache";
export const runtime = "edge";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export default async function handler(
  req: NextRequest,
  res: NextApiResponse<any>,
) {
  const ApiQuery = Object.fromEntries(req?.nextUrl?.searchParams?.entries());
  const cacheKey = JSON.stringify(ApiQuery);

  // Check if the result for this query is already cached
  const cachedResult = getCache(cacheKey);
  if (cachedResult) {
    // return res.status(200).json(cachedResult);
    console.log("got from cache");

    return NextResponse.json(cachedResult);
  }
  // console.log(req);
  const {
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
  }: any = ApiQuery;

  // console.log({
  //   requestID,
  //   id,
  //   language,
  //   page,
  //   genreKeywords,
  //   sortBy,
  //   year,
  //   country,
  //   query,
  //   season,
  //   episode,
  // });
  const result: any = await axiosFetch({
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
  // Cache the result
  setCache(cacheKey, result);
  // console.log({ result });
  // res?.status(200)?.json(result);
  return NextResponse.json(result);
  // res.status(200).json({ name: "John Doe" });
}
