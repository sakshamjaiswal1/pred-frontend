import { useState, useMemo, useEffect } from "react";
import { useGlobalData } from "./useGlobalData";
import { useOpenOrders } from "./useOpenOrders";
import {
  OrderToggleEnum,
  OrderTypeEnumDropdown,
} from "@/enum/orderToggle.enum";
import { dollartoCent } from "@/utility/convertor";

export const useOrderForm = () => {
  const [orderType, setOrderType] = useState<OrderToggleEnum>(
    OrderToggleEnum.BUY
  );
  const [orderTypeDropdown, setOrderTypeDropdown] =
    useState<OrderTypeEnumDropdown>(OrderTypeEnumDropdown.LIMIT);
  const [priceAmount, setPriceAmount] = useState<number>(-Infinity);
  const [sharesAmount, setSharesAmount] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0);
  const [priceError, setPriceError] = useState<boolean>(false);
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const { userBalance, currentAssetPrice } = useGlobalData();
  const { addOrder } = useOpenOrders();

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
    return priceAmount !== -Infinity && priceAmount > 0;
  }, [priceAmount]);

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

    if (priceError) {
      setSubmitError("Please fix the price validation error");
      return;
    }

    const orderValue = (priceAmount / 100) * parseFloat(sharesAmount);
    const capitalAllocationPercentage = Math.min(
      Math.round((orderValue / userBalance) * 100),
      100
    );

    const newOrder = {
      symbol: "CSK / IPL Winner",
      orderType: (orderType === OrderToggleEnum.BUY ? "Buy" : "Sell") as
        | "Buy"
        | "Sell",
      type: orderType === OrderToggleEnum.BUY ? ("B" as const) : ("S" as const),
      dateTime: new Date().toLocaleString(),
      orderNo: `ORD${Date.now()}`,
      price: dollartoCent(priceAmount / 100, true) as string,
      filled: "0.00",
      amount: sharesAmount,
      percentage: capitalAllocationPercentage,
    };

    addOrder(newOrder);

    setPriceAmount(-Infinity);
    setSharesAmount("");
    setPercentage(0);
    setSubmitError("");
  };

  return {
    orderType,
    setOrderType,
    orderTypeDropdown,
    setOrderTypeDropdown,
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
