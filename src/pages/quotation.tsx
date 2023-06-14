import { PlusCircle } from "lucide-react";
import { type GetServerSideProps, type NextPage } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { CustomerList } from "~/components/customer-list";
import { AddCustomer } from "~/components/customer-list/add-customer";
import { PersonInChargeList } from "~/components/person-in-charge-list";
import { AddPic } from "~/components/person-in-charge-list/add-pic";
import { Quotation } from "~/components/quotation";
import Layout from "~/components/template/layout";
import { authOptions } from "~/server/auth";
import { Button } from "~/ui/button";
import { Separator } from "~/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs";

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
  return (
    <Layout title="Quotation">
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="customer" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="pic">Person in Charge</TabsTrigger>
              <TabsTrigger value="quotation">Quotation</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <div className="ml-auto mr-4">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Quotation
              </Button>
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
              <AddCustomer />
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
            <Quotation />
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
            <QuotPdf />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default QuotationPage;
