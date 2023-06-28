import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "~/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/dropdown-menu";
import { DeleteProduct } from "./delete-product";
import { UpdateProduct } from "./update-product";

export function RowProductActions({
  id,
  name,
}: {
  id: string;
  name: string;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <UpdateProduct id={id} name={name} open={open} setOpen={setOpen} />
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DeleteProduct id={id} name={name} open={open} setOpen={setOpen} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
