import { Pen, PlusCircle } from "lucide-react";
import { Button } from "~/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/ui/sheet";
import { UpdateQuotationForm } from "./update-quotation-form";
import { useState } from "react";

type Props = {
  id: string;
  orderNumber: string;
};

export const UpdateQuotation = ({ id, orderNumber }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet>
      <SheetTrigger className="flex w-full items-center">
        <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
        Edit
      </SheetTrigger>
      <SheetContent className="w-2/3">
        <SheetHeader>
          <SheetTitle>
            Update Quotation<span>{orderNumber}</span>
          </SheetTitle>
          <SheetDescription>
            Fill the form to update quotation and click the Submit button.
          </SheetDescription>
        </SheetHeader>
        <UpdateQuotationForm id={id} open={open} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
