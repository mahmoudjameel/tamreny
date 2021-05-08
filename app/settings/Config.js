export const API_URL = __DEV__
  ? "http://192.168.1.105:5000/api"
  : "https://tamreny.herokuapp.com/api";

export const YOUTUBE_PLAYER = __DEV__
  ? "http://192.168.1.105:5000/play-youtube?videoId="
  : "https://tamreny.herokuapp.com/play-youtube?videoId=";
