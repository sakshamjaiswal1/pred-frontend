import {
  HomeBottomTabsEnum,
  OrderToggleEnum,
  OrderTypeEnumDropdown,
} from "@/enum/orderToggle.enum";

export interface IUIState {
  currentHomeTab: HomeBottomTabsEnum;
  orderType: OrderToggleEnum;
  orderTypeDropdown: OrderTypeEnumDropdown;
}

export interface IUIReducerState {
  isLoading: boolean;
  error: string;
  data: IUIState;
}
