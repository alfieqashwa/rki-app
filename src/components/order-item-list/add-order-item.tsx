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
import { CreateOrderItemForm } from "./create-order-item-form";

export const AddOrderItem = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="whitespace-nowrap">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Order Item
        </Button>
      </SheetTrigger>
      <SheetContent className="w-2/3">
        <SheetHeader>
          <SheetTitle>Add New Order Item</SheetTitle>
          <SheetDescription>
            Fill the form to add new order and click the Submit button.
          </SheetDescription>
        </SheetHeader>
        <CreateOrderItemForm open={open} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
