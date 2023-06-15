import { type GetServerSideProps, type NextPage } from "next";
import { getServerSession } from "next-auth";
import { CustomerList } from "~/components/customer-list";
import { AddCustomer } from "~/components/customer-list/add-customer";
import { PersonInChargeList } from "~/components/person-in-charge-list";
import { AddPic } from "~/components/person-in-charge-list/add-pic";
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

const CustomerPage: NextPage = (): JSX.Element => {
  return (
    <Layout title="Customer">
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="customer" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="pic">Person in Charge</TabsTrigger>
            </TabsList>
            <div className="ml-auto mr-4">
              <AddCustomer />
            </div>
          </div>
          <TabsContent
            value="customer"
            className="border-none p-0 outline-none"
          >
            <div className="flex items-center justify-between pr-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  List of Customers
                </h2>
                <p className="text-sm text-muted-foreground">
                  You can create, edit, or delete your customer here.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <CustomerList />
          </TabsContent>
          <TabsContent value="pic" className="border-none p-0 outline-none">
            <div className="flex items-center justify-between pr-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  List of Person in Charge
                </h2>
                <p className="text-sm text-muted-foreground">
                  You can create, edit, or delete your PIC here.
                </p>
              </div>
              <AddPic />
            </div>
            <Separator className="my-4" />
            <PersonInChargeList />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CustomerPage;
