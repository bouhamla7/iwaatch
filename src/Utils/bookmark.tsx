// watchlist :{
//   movie:[],
//   tv:[],
// }

import {
  addToFbWatchlist,
  checkInFbWatchlist,
  fetchFbWatchlist,
  removeFromFbWatchlist,
} from "./firebaseUser";

export const getBookmarks = (userId: any) => {
  // console.log({ userId });
  if (userId !== null && userId !== undefined) {
    return fetchFbWatchlist({ userID: userId })
      .then((result) => result)
      .catch((err) => {
        console.error("Error fetching from Firebase:", err);
        const values: any = localStorage.getItem("RiveStreamWatchlist");
        return JSON.parse(values) || {};
      });
  } else {
    const values: any = localStorage.getItem("RiveStreamWatchlist");
    return JSON.parse(values) || {};
  }
  return {};
};

export const setBookmarks = ({ userId = null, type, id }: any) => {
  if (userId !== null) {
    return addToFbWatchlist({ userID: userId, type, id }).catch(
      async (error) => {
        console.error("Error adding to Firebase:", error);
        var values: any = (await getBookmarks(userId)) || { movie: [], tv: [] };
        if (!values[type]?.includes(id)) {
          values[type] = values[type].reverse();
          values[type]?.push(id);
          values[type] = values[type].reverse();
          localStorage.setItem("RiveStreamWatchlist", JSON.stringify(values));
        }
      },
    );
  } else {
    var values: any = getBookmarks(userId) || { movie: [], tv: [] };
    if (!values[type]?.includes(id)) {
      values[type] = values[type].reverse();
      values[type]?.push(id);
      values[type] = values[type].reverse();
      localStorage.setItem("RiveStreamWatchlist", JSON.stringify(values));
    }
  }
};

export const removeBookmarks = ({ userId = null, type, id }: any) => {
  if (userId !== null) {
    return removeFromFbWatchlist({ userID: userId, type, id }).catch(
      async (error) => {
        console.error("Error removing from Firebase:", error);
        var values: any = (await getBookmarks(userId)) || { movie: [], tv: [] };
        if (values[type]?.includes(id)) {
          values[type] = values[type].filter((ele: any) => ele !== id);
          localStorage.setItem("RiveStreamWatchlist", JSON.stringify(values));
        }
      },
    );
  } else {
    var values: any = getBookmarks(userId) || { movie: [], tv: [] };
    if (values[type]?.includes(id)) {
      values[type] = values[type].filter((ele: any) => ele !== id);
      localStorage.setItem("RiveStreamWatchlist", JSON.stringify(values));
    }
  }
};

export const checkBookmarks = ({ userId = null, type, id }: any) => {
  if (userId !== null) {
    return checkInFbWatchlist({ userID: userId, type, id })
      .then((result) => result)
      .catch(async (error) => {
        console.error("Error checking in Firebase:", error);
        var values: any = (await getBookmarks(userId)) || { movie: [], tv: [] };
        if (values[type]?.includes(id)) {
          return true;
        }
        return false;
      });
  } else {
    var values: any = getBookmarks(userId) || { movie: [], tv: [] };
    if (values[type]?.includes(id)) {
      return true;
    }
    return false;
  }
};
