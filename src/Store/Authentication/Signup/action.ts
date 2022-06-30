import { REG_FAILURE, REG_REQUEST, REG_SUCCESS } from "./actionTypes";
import { post } from "API/Helpers";

const startReg =
  (email: string, password: string, history: any) => async (dispatch: any) => {
    dispatch(requestStart());
    try {
      const response = await post("/registration", { email, password });
      if (response.status === 1) {
        dispatch(receivedSuccess(response.message, response.access_token));
        history.push("/login");
      } else {
        dispatch(requestFailure(response.message));
      }
    } catch (error: any) {
      dispatch(requestFailure(error.response.data.message));
    }
  };

const requestStart = () => ({
  type: REG_REQUEST,
});

const requestFailure = (message: string) => ({
  type: REG_FAILURE,
  payload: {
    message,
  },
});

const receivedSuccess = (message: string, user: any) => ({
  type: REG_SUCCESS,
  payload: {
    message,
    user,
  },
});

export default startReg;
