import { type StatusSaleOrder } from "@prisma/client";
import { FileText, MoreHorizontal } from "lucide-react";
import Link from "next/link";
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
import { UpdateStatus } from "./update-status";

type Props = {
  id: string;
  orderNumber: string;
  status: StatusSaleOrder;
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
      {props.status === "QUOTATION" && (
        <DropdownMenuContent align="end" className="w-[160px]">
          <Link
            href={`/sale/preview/${props.id}`}
            className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <FileText className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Preview
          </Link>

          <UpdateStatus
            id={props.id}
            name={props.orderNumber}
            open={open}
            setOpen={setOpen}
          />
          <DropdownMenuSeparator />
          {/* //* Don't surround the UpdateComponent with <DropdownMenuItem /> when use fields date-picker on dialog/modal (BUGS)  */}
          <UpdateQuotation
            id={props.id}
            orderNumber={props.orderNumber}
            open={open}
            setOpen={setOpen}
          />
          <DropdownMenuSeparator />
          <DeleteSale
            id={props.id}
            name={props.orderNumber}
            open={open}
            setOpen={setOpen}
          />
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
