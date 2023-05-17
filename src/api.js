import { BASE_URL } from "./config";

export const gamesApi = {
  // later convert this url to infinite scrolling
  fetchAllGames: () =>
    fetch(`${BASE_URL}`).then(res => {
      return res.json();
    })
};