import { useState, useMemo, useEffect } from "react";
import { useGlobalData } from "./useGlobalData";
import { useOpenOrders } from "./useOpenOrders";
import { usePositions } from "./usePositions";
import { useUIState } from "./useUIState";
import {
  OrderToggleEnum,
  OrderTypeEnumDropdown,
  HomeBottomTabsEnum,
} from "@/enum/orderToggle.enum";
import { dollartoCent } from "@/utility/convertor";
import { useToast } from "@/contexts/ToastContext";

export const useOrderForm = () => {
  const {
    orderType,
    orderTypeDropdown,
    updateOrderType,
    updateOrderTypeDropdown,
    updateCurrentHomeTab,
  } = useUIState();
  const [priceAmount, setPriceAmount] = useState<number>(-Infinity);
  const [sharesAmount, setSharesAmount] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0);
  const [priceError, setPriceError] = useState<boolean>(false);
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const { userBalance, currentAssetPrice } = useGlobalData();
  const { addOrder } = useOpenOrders();
  const { addPositionItem } = usePositions();
  const { showToast } = useToast();

  useEffect(() => {
    if (percentage === 0) {
      setSharesAmount("");
    }
  }, [percentage]);

  const validateLimitPrice = useMemo(() => {
    if (
      orderTypeDropdown !== OrderTypeEnumDropdown.LIMIT ||
      priceAmount === -Infinity ||
      priceAmount === 0
    ) {
      return true;
    }

    if (orderType === OrderToggleEnum.BUY) {
      return priceAmount < currentAssetPrice * 100;
    } else {
      return priceAmount > currentAssetPrice * 100;
    }
  }, [orderTypeDropdown, orderType, priceAmount, currentAssetPrice]);

  const validateQuantity = useMemo(() => {
    return sharesAmount !== "" && parseFloat(sharesAmount) > 0;
  }, [sharesAmount]);

  const validatePrice = useMemo(() => {
    if (orderTypeDropdown === OrderTypeEnumDropdown.MARKET) {
      return true;
    }
    return priceAmount !== -Infinity && priceAmount > 0;
  }, [priceAmount, orderTypeDropdown]);

  useEffect(() => {
    setPriceError(!validateLimitPrice);
  }, [validateLimitPrice]);

  useEffect(() => {
    setQuantityError(!validateQuantity && sharesAmount !== "");
  }, [validateQuantity, sharesAmount]);

  const calculations = useMemo(() => {
    const amountToSpend = userBalance * (percentage / 100);
    const numberOfShares = amountToSpend / currentAssetPrice;
    const orderTotal = numberOfShares * currentAssetPrice;
    const potentialWin = numberOfShares * (1 - currentAssetPrice);

    return {
      amountToSpend,
      numberOfShares: numberOfShares.toFixed(2),
      orderTotal: orderTotal.toFixed(2),
      potentialWin: potentialWin.toFixed(2),
    };
  }, [userBalance, percentage, currentAssetPrice]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceAmount(Number(e.target.value) || -Infinity);
    setSubmitError("");
  };

  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSharesAmount(e.target.value);
    setPercentage(0);
    setSubmitError("");
  };

  const handlePercentageChange = (value: number) => {
    setPercentage(value);
    const amountToSpend = userBalance * (value / 100);
    const numberOfShares = amountToSpend / currentAssetPrice;
    setSharesAmount(numberOfShares.toFixed(2));
    setSubmitError("");
  };

  const handleSubmitOrder = () => {
    if (!validatePrice) {
      setSubmitError("Please enter a valid price");
      return;
    }

    if (!validateQuantity) {
      setSubmitError("Please enter a valid quantity");
      return;
    }

    if (priceError && orderTypeDropdown === OrderTypeEnumDropdown.LIMIT) {
      setSubmitError("Please fix the price validation error");
      return;
    }

    const finalPrice =
      orderTypeDropdown === OrderTypeEnumDropdown.MARKET
        ? currentAssetPrice
        : priceAmount / 100;

    const orderValue = finalPrice * parseFloat(sharesAmount);
    const capitalAllocationPercentage = Math.min(
      Math.round((orderValue / userBalance) * 100),
      100
    );

    if (orderTypeDropdown === OrderTypeEnumDropdown.MARKET) {
      // Market orders go to positions
      const newPosition = {
        id: `pos-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        symbol: "CSK",
        type:
          orderType === OrderToggleEnum.BUY ? ("B" as const) : ("S" as const),
        pnl: "0.00",
        pnlColor: "green" as const,
        roi: "0.00%",
        roiColor: "green" as const,
        size: sharesAmount,
        margin: orderValue.toFixed(2),
        entryPrice: finalPrice.toFixed(5),
        markPrice: finalPrice.toFixed(5),
        sizePercentage: "+0.00%",
        sizePercentageColor: "gray" as const,
        lastSize: sharesAmount,
      };

      addPositionItem(newPosition);

      // Switch to Positions tab when market order is placed
      updateCurrentHomeTab(HomeBottomTabsEnum.POSITIONS);

      const orderTypeText = orderType === OrderToggleEnum.BUY ? "Buy" : "Sell";
      const priceText = dollartoCent(currentAssetPrice, true);
      showToast(
        `Market ${orderTypeText} order executed at ${priceText} for ${sharesAmount} shares`,
        "success",
        4000
      );
    } else {
      // Limit orders go to open orders
      const newOrder = {
        symbol: "CSK / IPL Winner",
        orderType: (orderType === OrderToggleEnum.BUY ? "Buy" : "Sell") as
          | "Buy"
          | "Sell",
        type:
          orderType === OrderToggleEnum.BUY ? ("B" as const) : ("S" as const),
        dateTime: new Date().toLocaleString(),
        orderNo: `ORD${Date.now()}`,
        price: dollartoCent(finalPrice, true) as string,
        filled: "0.00",
        amount: sharesAmount,
        percentage: capitalAllocationPercentage,
      };

      addOrder(newOrder);

      // Switch to Open Orders tab when limit order is placed
      updateCurrentHomeTab(HomeBottomTabsEnum.OPEN_ORDERS);

      const orderTypeText = orderType === OrderToggleEnum.BUY ? "Buy" : "Sell";
      const priceText = dollartoCent(priceAmount / 100, true);
      showToast(
        `Limit ${orderTypeText} order placed at ${priceText} for ${sharesAmount} shares`,
        "success",
        4000
      );
    }

    setPriceAmount(-Infinity);
    setSharesAmount("");
    setPercentage(0);
    setSubmitError("");
  };

  return {
    orderType,
    setOrderType: updateOrderType,
    orderTypeDropdown,
    setOrderTypeDropdown: updateOrderTypeDropdown,
    priceAmount,
    sharesAmount,
    percentage,
    priceError,
    quantityError,
    submitError,
    validatePrice,
    validateQuantity,
    userBalance,
    currentAssetPrice,
    calculations,
    handlePriceChange,
    handleSharesChange,
    handlePercentageChange,
    handleSubmitOrder,
  };
};
