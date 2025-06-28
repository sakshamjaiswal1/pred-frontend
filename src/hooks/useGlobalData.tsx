import { useAppDispatch, useAppSelector } from "./useRedux";
import {
  setGlobalData,
  setUserBalance,
  setCurrentAssetPrice,
} from "@/redux/globalData/reducer";
import { IGlobalData } from "@/redux/globalData/interface";

export const useGlobalData = () => {
  const dispatch = useAppDispatch();
  const globalState = useAppSelector((state) => state?.globalData);
  const globalData = globalState?.data;

  const updateGlobalData = (data: IGlobalData) => {
    dispatch(setGlobalData(data));
  };

  const updateUserBalance = (balance: number) => {
    dispatch(setUserBalance(balance));
  };

  const updateCurrentAssetPrice = (price: number) => {
    dispatch(setCurrentAssetPrice(price));
  };

  return {
    globalData,
    userBalance: globalData?.userBalance || 100,
    currentAssetPrice: globalData?.currentAssetPrice || 0.4,
    isDarkModeEnabled: globalData?.isDarkModeEnabled,
    isMobile: globalData?.isMobile,
    isPWAOpened: globalData?.isPWAOpened,
    updateGlobalData,
    updateUserBalance,
    updateCurrentAssetPrice,
  };
};
