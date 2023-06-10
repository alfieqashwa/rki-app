import { playlists } from "~/data/playlists"
import { Sidebar } from "./sidebar"

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <main className="col-span-3 lg:col-span-4 lg:border-l">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}