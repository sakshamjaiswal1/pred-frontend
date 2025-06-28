export interface ITradeHistoryData {
  symbol: string;
  type: "B" | "S";
  orderType: "Buy" | "Sell";
  dateTime: string;
  orderNo: string;
  price: string;
  filled: string;
  fee: string;
  role: string;
  realizedPNL: string;
  pnlColor: "green" | "red";
}

export interface ITradeHistoryState {
  trades: ITradeHistoryData[];
}

export interface ITradeHistoryReducerState {
  isLoading: boolean;
  error: string;
  data: ITradeHistoryState;
}
