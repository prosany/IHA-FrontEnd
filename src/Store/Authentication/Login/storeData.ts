import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { STORE_LOGIN_DATA } from "./actionTypes";

interface IUser {
  token?: string;
  email?: string;
}

interface IActions {
  type: string;
  payload: {
    token?: string;
    email?: string;
  };
}

const initialState: IUser = {
  token: "",
  email: "",
};

const storeLoginReducer = (state = initialState, action: IActions) => {
  switch (action.type) {
    case STORE_LOGIN_DATA:
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

const persistentStore = {
  keyPrefix: "IHA-",
  key: "loginData",
  storage: storage,
};

export default persistReducer(persistentStore, storeLoginReducer);
