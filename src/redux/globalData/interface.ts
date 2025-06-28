export interface IGlobalData {
  isDarkModeEnabled: boolean;
  isMobile: boolean;
  isPWAOpened: boolean;
  userBalance: number;
  currentAssetPrice: number;
}

export interface IGlobalReducerState {
  isLoading: boolean;
  error: string;
  data: IGlobalData;
  isMobile: boolean;
}
