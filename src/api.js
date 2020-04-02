import axios from "axios";
import history from "./history.js";

const TIMEOUT = 5000;
const BASE_URL = `https://htmlacademy-react-3.appspot.com/wtw`;

const Error = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response, request} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      if (request.responseURL !== BASE_URL + `/login`) {
        history.push(`/login`);
      }

      throw err;
    }

    if (response.status === Error.BAD_REQUEST) {
      onUnauthorized();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
