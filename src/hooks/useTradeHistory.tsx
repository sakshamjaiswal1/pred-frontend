import { useAppDispatch, useAppSelector } from "./useRedux";
import {
  addTradeHistory,
  updateTradeHistory,
  removeTradeHistory,
  setTradeHistoryData,
  resetTradeHistory,
} from "@/redux/tradeHistory/reducer";
import { ITradeHistoryData } from "@/interface/common.interface";

export const useTradeHistory = () => {
  const dispatch = useAppDispatch();
  const tradeHistoryState = useAppSelector((state) => state?.tradeHistory);
  const { trades } = tradeHistoryState?.data || { trades: [] };

  const addTrade = (trade: ITradeHistoryData) => {
    dispatch(addTradeHistory(trade));
  };

  const updateTrade = (orderNo: string, updatedTrade: ITradeHistoryData) => {
    dispatch(updateTradeHistory({ orderNo, updatedTrade }));
  };

  const removeTrade = (orderNo: string) => {
    dispatch(removeTradeHistory(orderNo));
  };

  const setAllTrades = (trades: ITradeHistoryData[]) => {
    dispatch(setTradeHistoryData({ trades }));
  };

  const clearAllTrades = () => {
    dispatch(resetTradeHistory());
  };

  return {
    trades,
    addTrade,
    updateTrade,
    removeTrade,
    setAllTrades,
    clearAllTrades,
  };
};
