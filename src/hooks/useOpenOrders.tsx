import { useAppDispatch, useAppSelector } from "./useRedux";
import {
  addOpenOrder,
  updateOpenOrder,
  removeOpenOrder,
  setOpenOrdersData,
  resetOpenOrders,
} from "@/redux/openOrders/reducer";
import { IOpenOrderData } from "@/interface/common.interface";

export const useOpenOrders = () => {
  const dispatch = useAppDispatch();
  const openOrdersState = useAppSelector((state) => state?.openOrders);
  const { orders } = openOrdersState?.data || { orders: [] };

  const addOrder = (order: IOpenOrderData) => {
    dispatch(addOpenOrder(order));
  };

  const updateOrder = (orderNo: string, updatedOrder: IOpenOrderData) => {
    dispatch(updateOpenOrder({ orderNo, updatedOrder }));
  };

  const removeOrder = (orderNo: string) => {
    dispatch(removeOpenOrder(orderNo));
  };

  const setAllOrders = (orders: IOpenOrderData[]) => {
    dispatch(setOpenOrdersData({ orders }));
  };

  const clearAllOrders = () => {
    dispatch(resetOpenOrders());
  };

  return {
    orders,
    addOrder,
    updateOrder,
    removeOrder,
    setAllOrders,
    clearAllOrders,
  };
}; 