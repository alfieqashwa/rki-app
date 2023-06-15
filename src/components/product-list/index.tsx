import { LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";
import { columnsProduct } from "./columnsProduct";
import { ProductTable } from "./product-table";

export const ProductList = (): JSX.Element => {
  const productsQuery = api.product.getAll.useQuery();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {productsQuery.isLoading && <LoadingSpinner />}
      {productsQuery.status === "success" && (
        <ProductTable data={productsQuery.data} columns={columnsProduct} />
      )}
    </div>
  );
};
