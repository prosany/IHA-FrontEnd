import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionTypes";

interface IState {
  processing: boolean;
  processingMessage: string;
  error: boolean;
  errorMessage: string;
  success: boolean;
  successMessage: string;
  user?: IUser;
}

interface IUser {
  id?: number | string;
  name?: string;
  email?: string;
  token?: string;
}

interface IAction {
  type: string;
  payload: {
    message?: string;
    user?: IUser;
  };
}

const initialState: IState = {
  processing: false,
  processingMessage: "",
  error: false,
  errorMessage: "",
  success: false,
  successMessage: "",
  user: {},
};

const loginReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        processing: true,
        processingMessage: "Logging...",
        error: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        processing: false,
        processingMessage: "",
        error: true,
        errorMessage: action.payload.message,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        processing: false,
        processingMessage: "",
        error: false,
        errorMessage: "",
        success: true,
        successMessage: action.payload.message || "Logged in successfully.",
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default loginReducer;
