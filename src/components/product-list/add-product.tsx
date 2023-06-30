import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "~/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/ui/sheet";
import { AddProductForm } from "./add-product-form";

export const AddProduct = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild onSelect={(e) => e.preventDefault()}>
        <Button className="whitespace-nowrap">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="sm">
        <SheetHeader>
          <SheetTitle>Add New Product</SheetTitle>
          <SheetDescription>
            Fill the form to create new product and click the Submit button.
          </SheetDescription>
        </SheetHeader>
        <AddProductForm open={open} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
