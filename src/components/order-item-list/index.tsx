import { LoadingSpinner } from "~/components/loading";
import { type RouterOutputs } from "~/utils/api";
import { columnsOrderItem } from "./columnsOrderItem";
import { OrderItemTable } from "./order-item-table";

type Props = {
  orderItems?: RouterOutputs["orderItem"]["getAllOrderItemBySaleId"];
  status: "error" | "success" | "loading";
};

export const OrderItemList = ({ orderItems, status }: Props): JSX.Element => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {status === "loading" && <LoadingSpinner />}
      {status === "success" && (
        <OrderItemTable data={orderItems as []} columns={columnsOrderItem} />
      )}
    </div>
  );
};
