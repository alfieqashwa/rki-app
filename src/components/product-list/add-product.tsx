import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/ui/sheet";
import { ToastAction } from "~/ui/toast";
import { toast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { wait } from "~/utils/wait";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UomType } from "@prisma/client";

export const AddProduct = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  // Mutations
  const utils = api.useContext();

  const { mutate, isLoading, error } = api.product.create.useMutation({
    async onSuccess() {
      toast({
        title: "Succeed!",
        variant: "default",
        description: "Your form has been created.",
      });

      await wait().then(() => setOpen(false));
      await utils.product.getAll.invalidate();
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().toLowerCase() as string;
    const uom = formData.get("uom")?.toString().toLowerCase() as UomType;
    const countInStock = formData.get("countInStock") as string;

    mutate({
      name,
      uom,
      countInStock: +countInStock,
    });
  };

  const disabled = false;
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
          <SheetTitle>Add New Customer</SheetTitle>
          <SheetDescription>
            Fill the form to create new product and click the Submit button.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="company name"
                className="col-span-3 capitalize"
              />
              {error?.data?.zodError?.fieldErrors.name && (
                <span className="col-span-4 -mt-2.5 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.name}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="uom" className="text-right">
                UoM
              </Label>
              <Select name="uom">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Unit of Measure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UomType.pack}>pack</SelectItem>
                  <SelectItem value={UomType.m}>m</SelectItem>
                  <SelectItem value={UomType.set}>set</SelectItem>
                  <SelectItem value={UomType.box}>box</SelectItem>
                  <SelectItem value={UomType.ls}>ls</SelectItem>
                  <SelectItem value={UomType.tb}>tb</SelectItem>
                  <SelectItem value={UomType.sht}>sht</SelectItem>
                  <SelectItem value={UomType.lot}>lot</SelectItem>
                  <SelectItem value={UomType.roll}>roll</SelectItem>
                  <SelectItem value={UomType.other}>other</SelectItem>
                </SelectContent>
              </Select>
              {error?.data?.zodError?.fieldErrors.uom && (
                <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.uom}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="countInStock" className="text-right">
                Stock
              </Label>
              <Input
                id="countInStock"
                name="countInStock"
                type="number"
                min={0}
                placeholder="count in stock"
                className="col-span-3 capitalize"
              />
              {error?.data?.zodError?.fieldErrors.countInStock && (
                <span className="col-span-4 -mt-2.5 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.countInStock}
                </span>
              )}
            </div>
          </div>
          <SheetFooter className="absolute bottom-16 right-8 w-full">
            {isLoading ? (
              <Button disabled className="w-1/3">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={disabled} size="lg">
                Submit
              </Button>
            )}
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
