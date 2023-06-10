import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type AppType } from "next/app"
import { fontSans } from "~/lib/fonts"
import { cn } from "~/lib/utils"
import "~/styles/globals.css"
import { api } from "~/utils/api"

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
