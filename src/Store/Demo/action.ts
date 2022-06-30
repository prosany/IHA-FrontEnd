import { DECREMENT, INCREMENT, RESET } from "./actionTypes";

const incrementNumber = (data: number) => async (dispatch: any) => {
  dispatch(increaseNumber(data));
};

const decrementNumber = (data: number) => async (dispatch: any) => {
  dispatch(decreaseNumber(data));
};

const resetIncrements = () => async (dispatch: any) => {
  dispatch(resetNumber());
};

const increaseNumber = (increaseBy: number) => ({
  type: INCREMENT,
  payload: {
    count: increaseBy,
  },
});

const decreaseNumber = (decreaseBy: number) => ({
  type: DECREMENT,
  payload: {
    count: decreaseBy,
  },
});

const resetNumber = () => ({
  type: RESET,
});

export { incrementNumber, decrementNumber, resetIncrements };
