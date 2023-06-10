import { Bell } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { UserAvatar } from "./user-avatar"

export const NavigationHeader = () =>
  <nav className="flex h-20 w-full justify-between border-b-2 bg-background">
    <section className="flex w-full items-center justify-end space-x-4 px-4 lg:px-8">
      <Bell />
      <ThemeToggle />
      <UserAvatar
      />
    </section>
  </nav>