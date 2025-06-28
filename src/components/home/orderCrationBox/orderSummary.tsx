interface OrderSummaryProps {
  orderTotal: string;
  potentialWin: string;
  submitError: string;
}

function OrderSummary({ orderTotal, potentialWin, submitError }: OrderSummaryProps) {
  return (
    <>
      <div className="w-full h-[4px] bg-[#ECECEC] mt-[13px] mb-[8px]" />
      <div className="flex items-center justify-between text-[12px] font-[500] text-[#000000] leading-[16px] tracking-[0.12px]">
        <p>Order Total</p>
        <p>${orderTotal}</p>
      </div>
      <div className="mt-[10px] flex items-center justify-between text-[12px] font-[500] text-[#000000] leading-[16px] tracking-[0.12px]">
        <p>To Win 💵</p>
        <p>${potentialWin}</p>
      </div>

      {submitError && (
        <div className="mt-[8px] p-[8px] bg-red-50 border border-red-200 rounded">
          <p className="text-red-600 text-[12px] font-[500]">{submitError}</p>
        </div>
      )}
    </>
  );
}

export default OrderSummary;
