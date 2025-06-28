export   const dollartoCent = (amount: number, isSymbolAdded: boolean = true) => {
  const centsValue = Math.round(amount * 100);
  const finalCents = centsValue < 1 ? 1 : centsValue;
  return isSymbolAdded ? `${finalCents}¢` : finalCents;
};

 export  const centToDollar = (amount: number, isSymbolAdded: boolean = true) => {
  const dollarValue = amount / 100;
  const formattedValue = parseFloat(dollarValue.toFixed(2));
  return isSymbolAdded ? `$${formattedValue}` : dollarValue;
};


