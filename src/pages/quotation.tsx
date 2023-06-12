import { FilePlus2, PlusCircle } from "lucide-react"
import { type NextPage } from "next"
import dynamic from "next/dynamic"
import { Quotation } from "~/components/quotation"
import { AddCustomer } from "~/components/quotation/add-customer"
import Layout from "~/components/template/layout"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

const QuotPdf = dynamic(() => import("~/components/pdf/pdf-quotation"), {
  ssr: false,
})

const QuotationPage: NextPage = (): JSX.Element => {
  return (
    <Layout title="Quotation">
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="quotation" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="customer" className="relative">
                Customer
              </TabsTrigger>
              <TabsTrigger value="quotation">
                Quotation
              </TabsTrigger>
              <TabsTrigger value="preview">
                Preview
              </TabsTrigger>
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
            className="border-none p-0 outline-none">
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
            <div>CUSTOMER LIST</div>
          </TabsContent>
          <TabsContent
            value="quotation"
            className="border-none p-0 outline-none">
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
  )
}

export default QuotationPage