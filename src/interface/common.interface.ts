export type FixTypeLater = unknown;

export interface IPositionData {
  id: string;
  symbol: string;
  type: "B" | "S";
  pnl: string;
  pnlColor: "green" | "red";
  roi: string;
  roiColor: "green" | "red";
  size: string;
  margin: string;
  entryPrice: string;
  markPrice: string;
  sizePercentage: string;
  sizePercentageColor: "green" | "red" | "gray";
  lastSize: string;
}

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

export interface IOpenOrderData {
  symbol: string;
  orderType: "Buy" | "Sell";
  type: "B" | "S";
  dateTime: string;
  orderNo: string;
  price: string;
  filled: string;
  amount: string;
  percentage: number;
}
