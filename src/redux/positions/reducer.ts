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
    id: "pos-default-1",
    symbol: "CSK",
    type: "B",
    pnl: "+85.50",
    pnlColor: "green",
    roi: "+24.85%",
    roiColor: "green",
    size: "250.00",
    margin: "95.00",
    entryPrice: "0.38000",
    markPrice: "0.40420",
    sizePercentage: "+6.37%",
    sizePercentageColor: "green",
    lastSize: "---",
  },
  {
    id: "pos-default-2",
    symbol: "CSK",
    type: "S",
    pnl: "-42.75",
    pnlColor: "red",
    roi: "-18.26%",
    roiColor: "red",
    size: "150.00",
    margin: "63.00",
    entryPrice: "0.42000",
    markPrice: "0.40420",
    sizePercentage: "-3.76%",
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
      const updatedPositions = [payload, ...state.data.positions];

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
        id: string;
        updatedPosition: IPositionData;
      }>
    ) => {
      const updatedPositions = state.data.positions.map((position) =>
        position.id === payload.id ? payload.updatedPosition : position
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
    removePosition: (state, { payload }: PayloadAction<{ id: string }>) => {
      const updatedPositions = state.data.positions.filter(
        (position) => position.id !== payload.id
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
