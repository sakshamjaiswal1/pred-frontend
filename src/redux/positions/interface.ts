import { IPositionData } from "@/interface/common.interface";

export interface IPositionsState {
  positions: IPositionData[];
}

export interface IPositionsReducerState {
  isLoading: boolean;
  error: string;
  data: IPositionsState;
} 