import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../hooks/useLocalStorage";
import { IGlobalReducerState } from "./interface";
import { LocalStorageIdEnum } from "@/enum/utility.enum";

const userDetails = getLocalStorageData(LocalStorageIdEnum.USER_DETAILS, {
  isDarkModeEnabled: true,
  isMobile: window?.innerWidth < 768,
  isPWAOpened: window.matchMedia("(display-mode: standalone)").matches,
  userBalance: 80,
  currentAssetPrice: 0.4,
});

export const initialState: IGlobalReducerState = {
  isLoading: false,
  error: "",
  isMobile: window?.innerWidth < 768,
  data: {
    isDarkModeEnabled: userDetails?.isDarkModeEnabled,
    isMobile: userDetails.isMobile,
    isPWAOpened: userDetails?.isPWAOpened,
    userBalance: userDetails?.userBalance || 80,
    currentAssetPrice: userDetails?.currentAssetPrice || 0.4,
  },
};

export const globalDataSlice = createSlice({
  name: "themeData",
  initialState,
  reducers: {
    setGlobalData: (
      state,
      { payload }: PayloadAction<IGlobalReducerState["data"]>
    ) => {
      setLocalStorageData(LocalStorageIdEnum.USER_DETAILS, {
        isDarkModeEnabled: payload.isDarkModeEnabled,
        isMobile: payload.isMobile,
        isPWAOpened: window.matchMedia("(display-mode: standalone)").matches,
        userBalance: payload.userBalance,
        currentAssetPrice: payload.currentAssetPrice,
      });

      if (payload.isDarkModeEnabled) {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          ...payload,
          isPWAOpened: window.matchMedia("(display-mode: standalone)").matches,
        },
      };
    },
    setUserBalance: (state, { payload }: PayloadAction<number>) => {
      const updatedData = {
        ...state.data,
        userBalance: payload,
      };

      setLocalStorageData(LocalStorageIdEnum.USER_DETAILS, {
        isDarkModeEnabled: updatedData.isDarkModeEnabled,
        isMobile: updatedData.isMobile,
        isPWAOpened: updatedData.isPWAOpened,
        userBalance: updatedData.userBalance,
        currentAssetPrice: updatedData.currentAssetPrice,
      });

      return {
        ...state,
        data: updatedData,
      };
    },
    setCurrentAssetPrice: (state, { payload }: PayloadAction<number>) => {
      const updatedData = {
        ...state.data,
        currentAssetPrice: payload,
      };

      setLocalStorageData(LocalStorageIdEnum.USER_DETAILS, {
        isDarkModeEnabled: updatedData.isDarkModeEnabled,
        isMobile: updatedData.isMobile,
        isPWAOpened: updatedData.isPWAOpened,
        userBalance: updatedData.userBalance,
        currentAssetPrice: updatedData.currentAssetPrice,
      });

      return {
        ...state,
        data: updatedData,
      };
    },
    globalDataGetFail: (
      state,
      { payload }: PayloadAction<IGlobalReducerState["error"]>
    ) => {
      setLocalStorageData(LocalStorageIdEnum.USER_DETAILS, {
        isPWAOpened: window.matchMedia("(display-mode: standalone)").matches,
        isDarkModeEnabled: true,
        isMobile: false,
        userBalance: 100,
        currentAssetPrice: 0.4,
      });

      return {
        ...state,
        isLoading: false,
        error: payload,
        data: {
          isDarkModeEnabled: false,
          isMobile: false,
          isPWAOpened: false,
          userBalance: 100,
          currentAssetPrice: 0.4,
        },
      };
    },
    resetGlobalData: (state) => {
      setLocalStorageData(LocalStorageIdEnum.USER_DETAILS, {
        isPWAOpened: window.matchMedia("(display-mode: standalone)").matches,
        isDarkModeEnabled: true,
        isMobile: false,
        userBalance: 100,
        currentAssetPrice: 0.4,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          isDarkModeEnabled: true,
          isMobile: false,
          isPWAOpened: false,
          userBalance: 100,
          currentAssetPrice: 0.4,
        },
      };
    },
    setGLobalDataLoadingStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    setGLobalDataLoadingEnd: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    setGLobalMobileData: (state) => {
      return {
        ...state,
        isMobile: window?.innerWidth < 768,
      };
    },
  },
});

export const {
  setGlobalData,
  setUserBalance,
  setCurrentAssetPrice,
  globalDataGetFail,
  resetGlobalData,
  setGLobalDataLoadingStart,
  setGLobalDataLoadingEnd,
  setGLobalMobileData,
} = globalDataSlice.actions;

export default globalDataSlice.reducer;
