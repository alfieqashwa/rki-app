import { LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";
import { columnsSale } from "./columnsSale";
import { SaleTable } from "./sale-table";

export const SaleList = (): JSX.Element => {
  const salesQuery = api.sale.getAll.useQuery(undefined, {
    select: (sales) => sales.filter((sale) => sale.status === "QUOTATION"),
  });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {salesQuery.isLoading && <LoadingSpinner />}
      {salesQuery.status === "success" && (
        <SaleTable data={salesQuery.data} columns={columnsSale} />
      )}
    </div>
  );
};
