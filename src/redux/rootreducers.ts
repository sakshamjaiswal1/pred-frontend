import { combineReducers } from "@reduxjs/toolkit";
import globalDataReducer from "./globalData/reducer";
import tradeHistoryReducer from "./tradeHistory/reducer";

export const rootReducers = combineReducers({
  globalData: globalDataReducer,
  tradeHistory: tradeHistoryReducer,
});

export type RootState = ReturnType<typeof rootReducers>;
