import { get } from "API/Helpers";

const LoadDataAsync = (url: string, token: string) =>
  get(url, { headers: { Authorization: "Bearer " + token } });

export default LoadDataAsync;
