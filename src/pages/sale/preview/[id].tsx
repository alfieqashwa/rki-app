import { type GetServerSideProps, type NextPage } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "~/components/template/layout";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { authOptions } from "~/server/auth";
import { api } from "~/utils/api";

const PdfPreview = dynamic(() => import("~/components/pdf/pdf-quotation"), {
  ssr: false,
});

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

const PreviewSaleOrderByIdPage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id as string;

  // Queries
  const { data, status } = api.sale.getById.useQuery({ id }, { enabled: !!id });
  return (
    <Layout title="preview">
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="preview" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </div>
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
                  Please check the preview before download the pdf.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            {status === "success" && data != null && <PdfPreview data={data} />}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PreviewSaleOrderByIdPage;
