import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../hooks/useLocalStorage";
import { IUIReducerState } from "./interface";
import { LocalStorageIdEnum } from "@/enum/utility.enum";
import {
  HomeBottomTabsEnum,
  OrderToggleEnum,
  OrderTypeEnumDropdown,
} from "@/enum/orderToggle.enum";

const defaultUIState = {
  currentHomeTab: HomeBottomTabsEnum.OPEN_ORDERS,
  orderType: OrderToggleEnum.BUY,
  orderTypeDropdown: OrderTypeEnumDropdown.LIMIT,
};

const uiStateData = getLocalStorageData(
  LocalStorageIdEnum.UI_STATE,
  defaultUIState
);

export const initialState: IUIReducerState = {
  isLoading: false,
  error: "",
  data: {
    currentHomeTab:
      uiStateData?.currentHomeTab || HomeBottomTabsEnum.OPEN_ORDERS,
    orderType: uiStateData?.orderType || OrderToggleEnum.BUY,
    orderTypeDropdown:
      uiStateData?.orderTypeDropdown || OrderTypeEnumDropdown.LIMIT,
  },
};

export const uiStateSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    setCurrentHomeTab: (
      state,
      { payload }: PayloadAction<HomeBottomTabsEnum>
    ) => {
      const updatedData = {
        ...state.data,
        currentHomeTab: payload,
      };

      setLocalStorageData(LocalStorageIdEnum.UI_STATE, updatedData);

      return {
        ...state,
        data: updatedData,
      };
    },
    setOrderType: (state, { payload }: PayloadAction<OrderToggleEnum>) => {
      const updatedData = {
        ...state.data,
        orderType: payload,
      };

      setLocalStorageData(LocalStorageIdEnum.UI_STATE, updatedData);

      return {
        ...state,
        data: updatedData,
      };
    },
    setOrderTypeDropdown: (
      state,
      { payload }: PayloadAction<OrderTypeEnumDropdown>
    ) => {
      const updatedData = {
        ...state.data,
        orderTypeDropdown: payload,
      };

      setLocalStorageData(LocalStorageIdEnum.UI_STATE, updatedData);

      return {
        ...state,
        data: updatedData,
      };
    },
    setUIState: (
      state,
      { payload }: PayloadAction<IUIReducerState["data"]>
    ) => {
      setLocalStorageData(LocalStorageIdEnum.UI_STATE, payload);

      return {
        ...state,
        isLoading: false,
        error: "",
        data: payload,
      };
    },
    resetUIState: (state) => {
      setLocalStorageData(LocalStorageIdEnum.UI_STATE, defaultUIState);

      return {
        ...state,
        isLoading: false,
        error: "",
        data: defaultUIState,
      };
    },
    setUIStateLoadingStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    setUIStateLoadingEnd: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

export const {
  setCurrentHomeTab,
  setOrderType,
  setOrderTypeDropdown,
  setUIState,
  resetUIState,
  setUIStateLoadingStart,
  setUIStateLoadingEnd,
} = uiStateSlice.actions;

export default uiStateSlice.reducer;
