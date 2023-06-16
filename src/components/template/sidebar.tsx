import {
  LayoutGrid,
  Library,
  ListMusic,
  Mic2,
  Music2,
  PlayCircle,
  Radio,
  User,
} from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
//   x?: string
// }

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className }: SidebarProps) {
  const { pathname } = useRouter();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Sales
          </h2>
          <div className="space-y-1">
            <Link href="/customer">
              <Button
                variant={`${pathname === "/customer" ? "secondary" : "ghost"}`}
                size="sm"
                className="w-full justify-start"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Customers
              </Button>
            </Link>
            <Link href="/product">
              <Button
                variant={`${pathname === "/product" ? "secondary" : "ghost"}`}
                size="sm"
                className="w-full justify-start"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Products
              </Button>
            </Link>
            <Link href="/sale">
              <Button
                variant={`${pathname === "/sale" ? "secondary" : "ghost"}`}
                size="sm"
                className="w-full justify-start"
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Sales
              </Button>
            </Link>
            <Link href="/purchase">
              <Button
                variant={`${pathname === "/purchase" ? "secondary" : "ghost"}`}
                size="sm"
                className="w-full justify-start"
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Purchases
              </Button>
            </Link>
            <Link href="/invoice">
              <Button
                variant={`${pathname === "/invoice" ? "secondary" : "ghost"}`}
                size="sm"
                className="w-full justify-start"
              >
                <Radio className="mr-2 h-4 w-4" />
                Invoices
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Library
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <ListMusic className="mr-2 h-4 w-4" />
              Playlists
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Music2 className="mr-2 h-4 w-4" />
              Songs
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Made for You
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Mic2 className="mr-2 h-4 w-4" />
              Artists
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Library className="mr-2 h-4 w-4" />
              Albums
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
