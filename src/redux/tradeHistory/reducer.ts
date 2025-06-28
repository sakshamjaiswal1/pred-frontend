import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../hooks/useLocalStorage";
import { ITradeHistoryReducerState, ITradeHistoryData } from "./interface";
import { LocalStorageIdEnum } from "@/enum/utility.enum";

// Default sample trades
const defaultTrades: ITradeHistoryData[] = [
  {
    symbol: "CSK",
    type: "B",
    orderType: "Buy",
    dateTime: "2025-06-03 14:57:23",
    orderNo: "2424526851",
    price: "0.1252",
    filled: "16.0888000",
    fee: "0.00804440",
    role: "Taker",
    realizedPNL: "-0.1666000",
    pnlColor: "red",
  },
  {
    symbol: "CSK",
    type: "S",
    orderType: "Sell",
    dateTime: "2025-06-03 15:30:15",
    orderNo: "2424526852",
    price: "0.1350",
    filled: "20.5000000",
    fee: "0.01025000",
    role: "Maker",
    realizedPNL: "+0.2500000",
    pnlColor: "green",
  },
];

const tradeHistoryData = getLocalStorageData(LocalStorageIdEnum.TRADE_HISTORY, {
  trades: defaultTrades,
});

export const initialState: ITradeHistoryReducerState = {
  isLoading: false,
  error: "",
  data: {
    trades: tradeHistoryData?.trades || defaultTrades,
  },
};

export const tradeHistorySlice = createSlice({
  name: "tradeHistory",
  initialState,
  reducers: {
    setTradeHistoryData: (
      state,
      { payload }: PayloadAction<ITradeHistoryReducerState["data"]>
    ) => {
      setLocalStorageData(LocalStorageIdEnum.TRADE_HISTORY, {
        trades: payload.trades,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: payload,
      };
    },
    addTradeHistory: (state, { payload }: PayloadAction<ITradeHistoryData>) => {
      const updatedTrades = [payload, ...state.data.trades];

      setLocalStorageData(LocalStorageIdEnum.TRADE_HISTORY, {
        trades: updatedTrades,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          ...state.data,
          trades: updatedTrades,
        },
      };
    },
    updateTradeHistory: (
      state,
      {
        payload,
      }: PayloadAction<{ orderNo: string; updatedTrade: ITradeHistoryData }>
    ) => {
      const updatedTrades = state.data.trades.map((trade) =>
        trade.orderNo === payload.orderNo ? payload.updatedTrade : trade
      );

      setLocalStorageData(LocalStorageIdEnum.TRADE_HISTORY, {
        trades: updatedTrades,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          ...state.data,
          trades: updatedTrades,
        },
      };
    },
    removeTradeHistory: (
      state,
      { payload }: PayloadAction<string> // orderNo
    ) => {
      const updatedTrades = state.data.trades.filter(
        (trade) => trade.orderNo !== payload
      );

      setLocalStorageData(LocalStorageIdEnum.TRADE_HISTORY, {
        trades: updatedTrades,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          ...state.data,
          trades: updatedTrades,
        },
      };
    },
    tradeHistoryGetFail: (
      state,
      { payload }: PayloadAction<ITradeHistoryReducerState["error"]>
    ) => {
      setLocalStorageData(LocalStorageIdEnum.TRADE_HISTORY, {
        trades: [],
      });

      return {
        ...state,
        isLoading: false,
        error: payload,
        data: {
          trades: [],
        },
      };
    },
    resetTradeHistory: (state) => {
      setLocalStorageData(LocalStorageIdEnum.TRADE_HISTORY, {
        trades: [],
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          trades: [],
        },
      };
    },
    setTradeHistoryLoadingStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    setTradeHistoryLoadingEnd: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

export const {
  setTradeHistoryData,
  addTradeHistory,
  updateTradeHistory,
  removeTradeHistory,
  tradeHistoryGetFail,
  resetTradeHistory,
  setTradeHistoryLoadingStart,
  setTradeHistoryLoadingEnd,
} = tradeHistorySlice.actions;

export default tradeHistorySlice.reducer;
