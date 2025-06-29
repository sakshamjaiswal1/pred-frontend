import { combineReducers } from "@reduxjs/toolkit";
import globalDataReducer from "./globalData/reducer";
import tradeHistoryReducer from "./tradeHistory/reducer";
import openOrdersReducer from "./openOrders/reducer";
import positionsReducer from "./positions/reducer";
import uiStateReducer from "./uiState/reducer";

export const rootReducers = combineReducers({
  globalData: globalDataReducer,
  tradeHistory: tradeHistoryReducer,
  openOrders: openOrdersReducer,
  positions: positionsReducer,
  uiState: uiStateReducer,
});

export type RootState = ReturnType<typeof rootReducers>;
