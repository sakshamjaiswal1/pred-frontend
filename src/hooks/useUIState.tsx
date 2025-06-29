import { useAppDispatch, useAppSelector } from "./useRedux";
import {
  setCurrentHomeTab,
  setOrderType,
  setOrderTypeDropdown,
  setUIState,
  resetUIState,
} from "@/redux/uiState/reducer";
import {
  HomeBottomTabsEnum,
  OrderToggleEnum,
  OrderTypeEnumDropdown,
} from "@/enum/orderToggle.enum";
import { IUIState } from "@/redux/uiState/interface";

export const useUIState = () => {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector((state) => state?.uiState);
  const uiData = uiState?.data;

  const updateCurrentHomeTab = (tab: HomeBottomTabsEnum) => {
    dispatch(setCurrentHomeTab(tab));
  };

  const updateOrderType = (orderType: OrderToggleEnum) => {
    dispatch(setOrderType(orderType));
  };

  const updateOrderTypeDropdown = (
    orderTypeDropdown: OrderTypeEnumDropdown
  ) => {
    dispatch(setOrderTypeDropdown(orderTypeDropdown));
  };

  const updateUIState = (data: IUIState) => {
    dispatch(setUIState(data));
  };

  const resetUI = () => {
    dispatch(resetUIState());
  };

  return {
    uiData,
    currentHomeTab: uiData?.currentHomeTab || HomeBottomTabsEnum.OPEN_ORDERS,
    orderType: uiData?.orderType || OrderToggleEnum.BUY,
    orderTypeDropdown: uiData?.orderTypeDropdown || OrderTypeEnumDropdown.LIMIT,
    updateCurrentHomeTab,
    updateOrderType,
    updateOrderTypeDropdown,
    updateUIState,
    resetUI,
  };
};
