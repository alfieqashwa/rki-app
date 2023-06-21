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
import { type RouterOutputs } from "~/utils/api";
// import { DeleteSale } from "./delete-sale";
// import { UpdateSale } from "./update-sale";

export function RowOrderItemActions(props: RouterOutputs["sale"]["getAll"][0]) {
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
        {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <UpdateSale props={props} open={open} setOpen={setOpen} />
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DeleteSale
            id={props.id}
            name={props.orderNumber}
            open={open}
            setOpen={setOpen}
          />
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
