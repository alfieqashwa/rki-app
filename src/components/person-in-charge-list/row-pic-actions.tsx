import { Copy, MoreHorizontal } from "lucide-react";
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
import { DeletePic } from "./delete-pic";
import { UpdatePic } from "./update-pic";
import { CreatePersonInCharge } from "./create-person-in-charge";

type Props = {
  id: string;
  name: string;
  position: string | null;
  companyName: string;
};
export function RowPicActions({ id, name, position, companyName }: Props) {
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
        <DropdownMenuItem
          onClick={() => void navigator.clipboard.writeText(id)}
          className="hover:cursor-pointer"
        >
          <Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <CreatePersonInCharge id={id} customerName={name} />
        {/* <UpdatePic
          id={id}
          name={name}
          phone={phone}
          street={street}
          province={province}
          regency={regency}
          district={district}
          village={village}
          postalCode={postalCode}
          open={open}
          setOpen={setOpen}
        /> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DeletePic id={id} name={name} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
