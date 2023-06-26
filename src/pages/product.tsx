import { type GetServerSideProps, type NextPage } from "next";
import { getServerSession } from "next-auth";
import { ProductList } from "~/components/product-list";
import { AddProduct } from "~/components/product-list/add-product";
import Layout from "~/components/template/layout";
import { authOptions } from "~/server/auth";
import { Separator } from "~/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs";

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

const ProductPage: NextPage = (): JSX.Element => {
  return (
    <Layout title="Product">
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="product" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger disabled value="order-item">
                Order Item
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto mr-4">
              <AddProduct />
            </div>
          </div>
          <TabsContent value="product" className="border-none p-0 outline-none">
            <div className="flex items-center justify-between pr-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  List of Products
                </h2>
                <p className="text-sm text-muted-foreground">
                  You can create, edit, or delete your product here.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <ProductList />
          </TabsContent>
          <TabsContent
            value="order-item"
            className="border-none p-0 outline-none"
          >
            <div className="flex items-center justify-between pr-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  List of Order Items
                </h2>
                <p className="text-sm text-muted-foreground">
                  You can create, edit, or delete your Order Item here.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            {/* // TODO: OrderItemList */}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProductPage;
