import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../hooks/useLocalStorage";
import { IPositionsReducerState } from "./interface";
import { IPositionData } from "@/interface/common.interface";
import { LocalStorageIdEnum } from "@/enum/utility.enum";

const defaultPositions: IPositionData[] = [
  {
    symbol: "CSK",
    type: "B",
    pnl: "+221.65",
    pnlColor: "green",
    roi: "+91.61%",
    roiColor: "green",
    size: "1.3520",
    margin: "1.3520",
    entryPrice: "0.01650",
    markPrice: "0.010252",
    sizePercentage: "+6.15%",
    sizePercentageColor: "green",
    lastSize: "---",
  },
  {
    symbol: "CSK",
    type: "S",
    pnl: "-145.32",
    pnlColor: "red",
    roi: "-52.84%",
    roiColor: "red",
    size: "1.3520",
    margin: "1.3520",
    entryPrice: "0.01650",
    markPrice: "0.010252",
    sizePercentage: "-3.84%",
    sizePercentageColor: "red",
    lastSize: "---",
  },
];

const positionsData = getLocalStorageData(LocalStorageIdEnum.POSITIONS, {
  positions: defaultPositions,
});

export const initialState: IPositionsReducerState = {
  isLoading: false,
  error: "",
  data: {
    positions: positionsData?.positions || defaultPositions,
  },
};

export const positionsSlice = createSlice({
  name: "positions",
  initialState,
  reducers: {
    setPositionsData: (
      state,
      { payload }: PayloadAction<IPositionsReducerState["data"]>
    ) => {
      setLocalStorageData(LocalStorageIdEnum.POSITIONS, {
        positions: payload.positions,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: payload,
      };
    },
    addPosition: (state, { payload }: PayloadAction<IPositionData>) => {
      const updatedPositions = [...state.data.positions, payload];

      setLocalStorageData(LocalStorageIdEnum.POSITIONS, {
        positions: updatedPositions,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          ...state.data,
          positions: updatedPositions,
        },
      };
    },
    updatePosition: (
      state,
      {
        payload,
      }: PayloadAction<{
        symbol: string;
        type: "B" | "S";
        updatedPosition: IPositionData;
      }>
    ) => {
      const updatedPositions = state.data.positions.map((position) =>
        position.symbol === payload.symbol && position.type === payload.type
          ? payload.updatedPosition
          : position
      );

      setLocalStorageData(LocalStorageIdEnum.POSITIONS, {
        positions: updatedPositions,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          ...state.data,
          positions: updatedPositions,
        },
      };
    },
    removePosition: (
      state,
      { payload }: PayloadAction<{ symbol: string; type: "B" | "S" }>
    ) => {
      const updatedPositions = state.data.positions.filter(
        (position) =>
          !(
            position.symbol === payload.symbol && position.type === payload.type
          )
      );

      setLocalStorageData(LocalStorageIdEnum.POSITIONS, {
        positions: updatedPositions,
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          ...state.data,
          positions: updatedPositions,
        },
      };
    },
    positionsGetFail: (
      state,
      { payload }: PayloadAction<IPositionsReducerState["error"]>
    ) => {
      setLocalStorageData(LocalStorageIdEnum.POSITIONS, {
        positions: [],
      });

      return {
        ...state,
        isLoading: false,
        error: payload,
        data: {
          positions: [],
        },
      };
    },
    resetPositions: (state) => {
      setLocalStorageData(LocalStorageIdEnum.POSITIONS, {
        positions: [],
      });

      return {
        ...state,
        isLoading: false,
        error: "",
        data: {
          positions: [],
        },
      };
    },
    setPositionsLoadingStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    setPositionsLoadingEnd: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

export const {
  setPositionsData,
  addPosition,
  updatePosition,
  removePosition,
  positionsGetFail,
  resetPositions,
  setPositionsLoadingStart,
  setPositionsLoadingEnd,
} = positionsSlice.actions;

export default positionsSlice.reducer;
