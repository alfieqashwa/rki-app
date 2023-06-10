import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "~/components/ui/menubar"
import { Home, LogOut } from "lucide-react"

export const UserProfile = ({ image }: { image: string }): JSX.Element => {
  return (
    <Menubar className="h-12 w-12 items-center justify-center rounded-full border-2 border-foreground/50 p-0 transition-colors duration-300 ease-in-out hover:border-foreground/75">
      <MenubarMenu>
        <MenubarTrigger className="relative h-10 w-10 rounded-full px-0 py-0 hover:cursor-pointer">
          <Image src={image} alt="User Avatar" fill priority className="rounded-full" />
        </MenubarTrigger>
        <MenubarContent className="w-52">
          <HomeMenu />
          <MenubarItem
            onClick={() => void signOut()}
            className="hover:cursor-pointer"
          >
            Sign Out
            <MenubarShortcut className="text-foreground transition duration-300 ease-in-out group-hover:text-foreground">
              <LogOut size={18} className="shrink-0" />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar >
  )
}

// Add Home Menu
const HomeMenu = (): JSX.Element => (
  <Link href="/">
    <MenubarItem className="group capitalize hover:cursor-pointer">
      home
      <MenubarShortcut className="text-foreground transition duration-300 ease-in-out group-hover:text-foreground">
        <Home size={18} />
      </MenubarShortcut>
    </MenubarItem>
    <MenubarSeparator />
  </Link>
)
