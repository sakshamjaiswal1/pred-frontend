import { useAppDispatch, useAppSelector } from "./useRedux";
import {
  addTradeHistory,
  updateTradeHistory,
  removeTradeHistory,
  setTradeHistoryData,
  resetTradeHistory,
  setTradeHistoryLoadingStart,
  setTradeHistoryLoadingEnd,
} from "@/redux/tradeHistory/reducer";
import { ITradeHistoryData } from "@/interface/common.interface";

export const useTradeHistory = () => {
  const dispatch = useAppDispatch();
  const tradeHistoryState = useAppSelector((state) => state?.tradeHistory);
  const { trades } = tradeHistoryState?.data || { trades: [] };
  const { isLoading, error } = tradeHistoryState || {
    isLoading: false,
    error: "",
  };

  // Add a new trade to history
  const addTrade = (trade: ITradeHistoryData) => {
    dispatch(addTradeHistory(trade));
  };

  // Update an existing trade by order number
  const updateTrade = (orderNo: string, updatedTrade: ITradeHistoryData) => {
    dispatch(updateTradeHistory({ orderNo, updatedTrade }));
  };

  // Remove a trade by order number
  const removeTrade = (orderNo: string) => {
    dispatch(removeTradeHistory(orderNo));
  };

  // Set all trade history data (overwrite existing)
  const setAllTrades = (trades: ITradeHistoryData[]) => {
    dispatch(setTradeHistoryData({ trades }));
  };

  // Clear all trade history
  const clearAllTrades = () => {
    dispatch(resetTradeHistory());
  };

  // Loading state management
  const startLoading = () => {
    dispatch(setTradeHistoryLoadingStart());
  };

  const endLoading = () => {
    dispatch(setTradeHistoryLoadingEnd());
  };

  // Get trade by order number
  const getTradeByOrderNo = (
    orderNo: string
  ): ITradeHistoryData | undefined => {
    return trades.find((trade) => trade.orderNo === orderNo);
  };

  // Get trades by symbol
  const getTradesBySymbol = (symbol: string): ITradeHistoryData[] => {
    return trades.filter((trade) => trade.symbol === symbol);
  };

  // Get trades by type (Buy/Sell)
  const getTradesByType = (type: "B" | "S"): ITradeHistoryData[] => {
    return trades.filter((trade) => trade.type === type);
  };

  // Get recent trades (last N trades)
  const getRecentTrades = (count: number): ITradeHistoryData[] => {
    return trades.slice(-count);
  };

  // Calculate total PNL
  const getTotalPNL = (): number => {
    return trades.reduce((total, trade) => {
      const pnl = parseFloat(trade.realizedPNL.replace(/[^-\d.]/g, ""));
      return total + (isNaN(pnl) ? 0 : pnl);
    }, 0);
  };

  return {
    trades,
    isLoading,
    error,
    addTrade,
    updateTrade,
    removeTrade,
    setAllTrades,
    clearAllTrades,
    startLoading,
    endLoading,
    getTradeByOrderNo,
    getTradesBySymbol,
    getTradesByType,
    getRecentTrades,
  };
};
