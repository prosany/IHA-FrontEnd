import { DECREMENT, INCREMENT, RESET } from "./actionTypes";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

interface IAction {
  type: string;
  payload: {
    count: number;
  };
}

interface IState {
  count: number;
}

const initialState: IState = {
  count: 0,
};

const demoReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: action.payload.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: action.payload.count - 1,
      };
    case RESET:
      return {
        count: 0,
      };
    default:
      return state;
  }
};

const persistentStore = {
  keyPrefix: "betterInvoice-",
  key: "demo",
  storage: storage,
};

export default persistReducer(persistentStore, demoReducer);
