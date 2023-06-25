import { LoadingSpinner } from "~/components/loading";
import { type RouterOutputs } from "~/utils/api";
import { columnsSale } from "./columnsSale";
import { SaleTable } from "./sale-table";

type SaleListProps = {
  data: RouterOutputs["sale"]["getAll"];
  status: "error" | "success" | "loading";
};

export const SaleList = ({ data, status }: SaleListProps): JSX.Element => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {status === "loading" && <LoadingSpinner />}
      {status === "success" && <SaleTable data={data} columns={columnsSale} />}
    </div>
  );
};
