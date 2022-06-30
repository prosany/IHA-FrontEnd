import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  STORE_LOGIN_DATA,
} from "./actionTypes";
import { post } from "API/Helpers";

const startLogin =
  (email: string, password: string, history: any) => async (dispatch: any) => {
    dispatch(requestLogin());
    try {
      const response = await post("/login", { email, password });
      if (response.status === 1) {
        dispatch(receivedSuccess(response.message, response.access_token));
        dispatch(storeUserData(response.access_token, response.email));
        history.push("/");
      } else {
        dispatch(requestFailure(response.message));
      }
    } catch (error: any) {
      dispatch(requestFailure(error.response.data.message));
    }
  };

const requestLogin = () => ({
  type: LOGIN_REQUEST,
});

const requestFailure = (message: string) => ({
  type: LOGIN_FAILURE,
  payload: {
    message,
  },
});

const receivedSuccess = (message: string, user: any) => ({
  type: LOGIN_SUCCESS,
  payload: {
    message,
    user,
  },
});

export const storeUserData = (token: string, email: string) => ({
  type: STORE_LOGIN_DATA,
  payload: {
    token,
    email,
  },
});

export default startLogin;
