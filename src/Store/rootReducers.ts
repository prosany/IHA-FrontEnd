import { combineReducers } from "redux";
import demoReducer from "./Demo/reducer";
import loginReducer from "./Authentication/Login/reducer";
import storeLoginReducer from "./Authentication/Login/storeData";
import signupReducer from "./Authentication/Signup/reducer";

const rootReducers = combineReducers({
  demoReducer,
  loginReducer,
  storeLoginReducer,
  signupReducer,
});

export default rootReducers;
