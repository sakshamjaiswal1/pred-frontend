import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../hooks/useLocalStorage";
import { IOpenOrdersReducerState } from "./interface";
import { IOpenOrderData } from "@/interface/common.interface";
import { LocalStorageIdEnum } from "@/enum/utility.enum";

const defaultOpenOrders: IOpenOrderData[] = [
  {
    symbol: "CSK / IPL Winner",
    orderType: "Buy",
    type: "B",
    dateTime: "2025-06-03 14:57:23",
    orderNo: "ORD001",
    price: "30¢",
    filled: "0.00",
    amount: "0.01",
    percentage: 20,
  },
  {
    symbol: "RCB / IPL Winner",
    orderType: "Sell",
    type: "S",
    dateTime: "2025-06-03 15:20:15",
    orderNo: "ORD002",
    price: "45¢",
    filled: "0.25",
    amount: "0.50",
    percentage: 50,
  },
];

const openOrdersData = getLocalStorageData(LocalStorageIdEnum.OPEN_ORDERS, {
  orders: defaultOpenOrders,
});

export const initialState: IOpenOrdersReducerState = {
  isLoading: false,
  error: "",
  data: {
    orders: openOrdersData?.orders || defaultOpenOrders,
  },
};

export const openOrdersSlice = createSlice({
  name: "openOrders",
  initialState,
  reducers: {
    setOpenOrdersData: (
      state,
      { payload }: PayloadAction<IOpenOrdersReducerState["data"]>
    ) => {
      setLocalStorageData(LocalStorageIdEnum.OPEN_ORDERS, {
        orders: payload.orders,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: payload,
      };
    },
    addOpenOrder: (state, { payload }: PayloadAction<IOpenOrderData>) => {
      const updatedOrders = [...state.data.orders, payload];

      setLocalStorageData(LocalStorageIdEnum.OPEN_ORDERS, {
        orders: updatedOrders,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          ...state.data,
          orders: updatedOrders,
        },
      };
    },
    updateOpenOrder: (
      state,
      {
        payload,
      }: PayloadAction<{ orderNo: string; updatedOrder: IOpenOrderData }>
    ) => {
      const updatedOrders = state.data.orders.map((order) =>
        order.orderNo === payload.orderNo ? payload.updatedOrder : order
      );

      setLocalStorageData(LocalStorageIdEnum.OPEN_ORDERS, {
        orders: updatedOrders,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          ...state.data,
          orders: updatedOrders,
        },
      };
    },
    removeOpenOrder: (state, { payload }: PayloadAction<string>) => {
      const updatedOrders = state.data.orders.filter(
        (order) => order.orderNo !== payload
      );

      setLocalStorageData(LocalStorageIdEnum.OPEN_ORDERS, {
        orders: updatedOrders,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          ...state.data,
          orders: updatedOrders,
        },
      };
    },
    openOrdersGetFail: (
      state,
      { payload }: PayloadAction<IOpenOrdersReducerState["error"]>
    ) => {
      setLocalStorageData(LocalStorageIdEnum.OPEN_ORDERS, {
        orders: [],
      });

      return {
        ...state,
        isLoading: false,
        error: payload,
        data: {
          orders: [],
        },
      };
    },
    resetOpenOrders: (state) => {
      setLocalStorageData(LocalStorageIdEnum.OPEN_ORDERS, {
        orders: [],
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          orders: [],
        },
      };
    },
    setOpenOrdersLoadingStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    setOpenOrdersLoadingEnd: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

export const {
  setOpenOrdersData,
  addOpenOrder,
  updateOpenOrder,
  removeOpenOrder,
  openOrdersGetFail,
  resetOpenOrders,
  setOpenOrdersLoadingStart,
  setOpenOrdersLoadingEnd,
} = openOrdersSlice.actions;

export default openOrdersSlice.reducer;
