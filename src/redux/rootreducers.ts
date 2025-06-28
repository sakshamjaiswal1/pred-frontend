import { combineReducers } from "@reduxjs/toolkit";
import globalDataReducer from "./globalData/reducer";
import tradeHistoryReducer from "./tradeHistory/reducer";
import openOrdersReducer from "./openOrders/reducer";

export const rootReducers = combineReducers({
  globalData: globalDataReducer,
  tradeHistory: tradeHistoryReducer,
  openOrders: openOrdersReducer,
});

export type RootState = ReturnType<typeof rootReducers>;
