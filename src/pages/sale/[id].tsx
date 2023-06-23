import { type GetServerSideProps, type NextPage } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { OrderItemList } from "~/components/order-item-list";
import Layout from "~/components/template/layout";
import { authOptions } from "~/server/auth";
import { Separator } from "~/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs";
import { api } from "~/utils/api";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

const SaleOrderByIdPage: NextPage = () => {
  const { query } = useRouter();
  const saleOrderId = query.id as string;

  const { data, status } = api.orderItem.getAllOrderItemBySaleId.useQuery(
    {
      saleOrderId,
    },
    {
      enabled: !!saleOrderId,
      select: (data) => ({
        orderNumber: data.map((d) => d.saleOrder?.orderNumber)[0],
        orderItems: data,
        totalPrice: data.reduce(
          (acc, curr) => acc + curr.quantity * curr.product.salePrice,
          0
        ),
      }),
    }
  );

  const totalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(Number(data?.totalPrice));
  return (
    <Layout title="sale-order">
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="quotation" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="quotation">Order Item</TabsTrigger>
              <TabsTrigger disabled value="preview">
                Preview
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto mr-4">{/* <AddQuotation /> */}</div>
          </div>
          <TabsContent
            value="quotation"
            className="border-none p-0 outline-none"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  SO: {data?.orderNumber}
                </h2>
                <p className="text-muted-foreground">Detail of sale order.</p>
              </div>
              <div className="flex flex-col items-center space-y-1 rounded-lg border-2 px-3 py-2">
                <h2 className="text-xl font-semibold tracking-tight">
                  Total Price
                </h2>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {totalPrice}
                </h2>
              </div>
            </div>
            <Separator className="my-4" />
            <OrderItemList orderItems={data?.orderItems} status={status} />
          </TabsContent>
          <TabsContent
            value="preview"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  PDF Preview
                </h2>
                <p className="text-sm text-muted-foreground">
                  You can check preview and download the pdf.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            {/* <QuotPdf /> */}
          </TabsContent>
        </Tabs>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
};

export default SaleOrderByIdPage;

/**
 * SaleOrderNumber,
 * Status,
 * Id,
 * ProductName,
 * Description,
 * Qty,
 * uom,
 * salePrice
 * stock,
 */