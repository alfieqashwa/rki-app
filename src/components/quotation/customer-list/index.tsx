import { LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";
import { CustomerTable } from "./customer-table";
import { columnsCustomer } from "./columnsCustomer";

export const CustomerList = (): JSX.Element => {
  const customerListQuery = api.company.customerList.useQuery();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {customerListQuery.isLoading && <LoadingSpinner />}
      {customerListQuery.status === "success" && (
        <CustomerTable
          data={customerListQuery.data}
          columns={columnsCustomer}
        />
      )}
      <pre>{JSON.stringify(customerListQuery.data, null, 2)}</pre>
    </div>
  );
};
