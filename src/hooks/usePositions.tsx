import { useAppDispatch, useAppSelector } from "./useRedux";
import {
  addPosition,
  updatePosition,
  removePosition,
  setPositionsData,
  resetPositions,
} from "@/redux/positions/reducer";
import { IPositionData } from "@/interface/common.interface";

export const usePositions = () => {
  const dispatch = useAppDispatch();
  const positionsState = useAppSelector((state) => state?.positions);
  const { positions } = positionsState?.data || { positions: [] };

  const addPositionItem = (position: IPositionData) => {
    dispatch(addPosition(position));
  };

  const updatePositionItem = (
    symbol: string,
    type: "B" | "S",
    updatedPosition: IPositionData
  ) => {
    dispatch(updatePosition({ symbol, type, updatedPosition }));
  };

  const removePositionItem = (symbol: string, type: "B" | "S") => {
    dispatch(removePosition({ symbol, type }));
  };

  const setAllPositions = (positions: IPositionData[]) => {
    dispatch(setPositionsData({ positions }));
  };

  const clearAllPositions = () => {
    dispatch(resetPositions());
  };

  return {
    positions,
    addPositionItem,
    updatePositionItem,
    removePositionItem,
    setAllPositions,
    clearAllPositions,
  };
};
