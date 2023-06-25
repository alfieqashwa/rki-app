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
import { DeleteCustomer } from "./delete-customer";
import { UpdateCustomer } from "./update-customer";

export function RowCustomerActions(
  props: RouterOutputs["company"]["customerList"][0]
) {
  const {
    id,
    name,
    phone,
    address: { street, province, regency, district, village, postalCode },
  } = props;
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
        <UpdateCustomer
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
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DeleteCustomer id={id} name={name} open={open} setOpen={setOpen} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
