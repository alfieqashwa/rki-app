import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "~/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/dropdown-menu";
import { DeleteSale } from "./delete-sale";
import { UpdateQuotation } from "./update-quotation";

type Props = {
  id: string;
  orderNumber: string;
};

export function RowSaleActions(props: Props) {
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
        {/* //* Don't surround the UpdateComponent with <DropdownMenuItem /> when use fields date-picker on dialog/modal (BUGS)  */}
        <UpdateQuotation id={props.id} orderNumber={props.orderNumber} />
        <DropdownMenuSeparator />
        <DeleteSale
          id={props.id}
          name={props.orderNumber}
          open={open}
          setOpen={setOpen}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
