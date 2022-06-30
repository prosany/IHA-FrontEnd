import { REG_FAILURE, REG_REQUEST, REG_SUCCESS } from "./actionTypes";

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

const signupReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case REG_REQUEST:
      return {
        ...state,
        processing: true,
        processingMessage: "Registering...",
        error: false,
      };
    case REG_FAILURE:
      return {
        ...state,
        processing: false,
        processingMessage: "",
        error: true,
        errorMessage: action.payload.message,
      };
    case REG_SUCCESS:
      return {
        ...state,
        processing: false,
        processingMessage: "",
        error: false,
        errorMessage: "",
        success: true,
        successMessage: action.payload.message || "Sign up successfully.",
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default signupReducer;
