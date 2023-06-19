import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "~/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/ui/sheet";
import { CreateQuotationForm } from "./create-quotation-form";

export const AddQuotation = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="whitespace-nowrap">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Quotation
        </Button>
      </SheetTrigger>
      <SheetContent className="w-2/3">
        <SheetHeader>
          <SheetTitle>Add New Quotation</SheetTitle>
          <SheetDescription>
            Fill the form to create new quotation and click the Submit button.
          </SheetDescription>
        </SheetHeader>
        <CreateQuotationForm open={open} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
