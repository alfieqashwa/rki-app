import { VAT } from "~/constants/vat";

type TotalPriceProps = {
  totalPrice: number;
};

export const TotalPrice = ({ totalPrice }: TotalPriceProps) => {
  // Value Add Tax
  const sumOfTax = totalPrice * VAT;

  const formattedTotalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(Number(totalPrice + sumOfTax));

  return (
    <div className="flex flex-col items-center space-y-1 rounded-xl border-4 px-6 py-2">
      <h2 className="text-xl font-semibold tracking-tight">Total Price</h2>
      <h2 className="tracking-tigh text-2xl font-semibold text-primary">
        {formattedTotalPrice}
      </h2>
    </div>
  );
};
