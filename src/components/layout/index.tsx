import { playlists } from "~/data/playlists"
import Head from "next/head"
import { Bell } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
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
                <nav className="flex h-20 w-full justify-between border-b-2 bg-background">
                  <section className="flex w-full items-center justify-end space-x-4 px-4 lg:px-8">
                    <Bell />
                    <ThemeToggle />
                    {/* <UserAvatar
          isLoading={isLoading}
          userImage={userImage}
          userImageUpdate={userImageUpdate}
        /> */}
                  </section>
                </nav>
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}