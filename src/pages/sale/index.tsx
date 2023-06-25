import { type GetServerSideProps, type NextPage } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { SaleList } from "~/components/quotation-list";
import { AddQuotation } from "~/components/quotation-list/add-quotation";
import Layout from "~/components/template/layout";
import { authOptions } from "~/server/auth";
import { Separator } from "~/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs";
import { api } from "~/utils/api";

const QuotPdf = dynamic(() => import("~/components/pdf/pdf-quotation"), {
  ssr: false,
});

// If No Authenticated, then redirect to Home Page. Else, enter this page.
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

const QuotationPage: NextPage = (): JSX.Element => {
  const { data, status } = api.sale.getAll.useQuery(undefined, {
    select: (sales) => ({
      quotations: sales.filter((sale) => sale.status === "QUOTATION"),
      sales: sales.filter((sale) => sale.status === "SOLD"),
      noSale: sales.filter((sale) => sale.status === "SOLD").length === 0,
    }),
  });

  return (
    <Layout title="Sale Order">
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="quotation" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="quotation">Quotation</TabsTrigger>
              <TabsTrigger disabled={data?.noSale} value="sale">
                Sale
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto mr-4">
              <AddQuotation />
            </div>
          </div>
          <TabsContent
            value="quotation"
            className="border-none p-0 outline-none"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  List of Quotations
                </h2>
                <p className="text-sm text-muted-foreground">
                  Top picks for you. Updated daily.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <SaleList data={data?.quotations as []} status={status} />
          </TabsContent>

          <TabsContent value="sale" className="border-none p-0 outline-none">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  List of Sales
                </h2>
                <p className="text-sm text-muted-foreground">
                  The list information of sale orders.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <SaleList data={data?.sales as []} status={status} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default QuotationPage;
