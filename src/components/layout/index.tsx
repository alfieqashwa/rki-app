import Head from "next/head"
import { playlists } from "~/data/playlists"
import { NavigationHeader } from "./navigation-header"
import { Sidebar } from "./sidebar"

type LayoutProps = {
  children: React.ReactNode
  title: string
}

export default function Layout({ children, title = "" }: LayoutProps): JSX.Element {
  const titleHeader = `${title} | RKI APP`

  return (
    <>
      <Head>
        <title>{titleHeader}</title>
        <meta name="description" content="RKI App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <main className="col-span-3 lg:col-span-4 lg:border-l">
                <NavigationHeader />
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}