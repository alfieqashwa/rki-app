import Head from "next/head";
import { NavigationHeader } from "./navigation-header";
import { Sidebar } from "./sidebar";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export default function Layout({
  children,
  title = "",
}: LayoutProps): JSX.Element {
  const titleHeader = `${title} | RKI APP`;

  return (
    <>
      <Head>
        <title>{titleHeader}</title>
        <meta name="description" content="RKI App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationHeader />
      <div className="hidden pt-20 md:block ">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <main className="col-span-3 lg:col-span-4 lg:border-l">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
