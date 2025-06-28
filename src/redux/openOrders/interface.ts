import { IOpenOrderData } from "@/interface/common.interface";

export interface IOpenOrdersState {
  orders: IOpenOrderData[];
}

export interface IOpenOrdersReducerState {
  isLoading: boolean;
  error: string;
  data: IOpenOrdersState;
}
