import { api } from "~/utils/api";

export const CustomerList = (): JSX.Element => {
  const customerListQuery = api.company.customerList.useQuery();

  return (
    <div>
      <h1>Customer List</h1>
      <pre>{JSON.stringify(customerListQuery.data, null, 2)}</pre>
    </div>
  );
};
