import { useRouter } from "next/router";
import Layout from "~/components/template/layout";
import { api } from "~/utils/api";

export default function SaleOrderByIdPage() {
  const { query } = useRouter();
  const routerId = query.id as string;

  const getAllById = api.orderItem.getAllOrderItemBySaleId.useQuery(
    { saleOrderId: routerId },
    {
      enabled: !!routerId,
    }
  );

  return (
    <Layout title="sale-order">
      <div>Sale Order By Id</div>
      <pre>{JSON.stringify(getAllById.data, null, 2)}</pre>
    </Layout>
  );
}

/**
 * SaleOrderNumber,
 * Status,
 * Id,
 * Qty,
 * Description,
 * ProductName,
 * uom,
 * salePrice
 * stock,
 */
