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

  const updatePositionItem = (id: string, updatedPosition: IPositionData) => {
    dispatch(updatePosition({ id, updatedPosition }));
  };

  const removePositionItem = (id: string) => {
    dispatch(removePosition({ id }));
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
