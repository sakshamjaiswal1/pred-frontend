export interface IGlobalData {
  isDarkModeEnabled: boolean;
  isMobile: boolean;
  isPWAOpened: boolean;
}

export interface IGlobalReducerState {
  isLoading: boolean;
  error: string;
  data: IGlobalData;
  isMobile: boolean;
}
