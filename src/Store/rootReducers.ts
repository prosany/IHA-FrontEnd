import { combineReducers } from "redux";
import loginReducer from "./Authentication/Login/reducer";
import storeLoginReducer from "./Authentication/Login/storeData";
import signupReducer from "./Authentication/Signup/reducer";

const rootReducers = combineReducers({
  loginReducer,
  storeLoginReducer,
  signupReducer,
});

export default rootReducers;
