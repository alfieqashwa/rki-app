import { Category, UomType } from "@prisma/client";
import { Loader2, Pen } from "lucide-react";
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
import { useToast } from "~/ui/use-toast";
import { api, type RouterOutputs } from "~/utils/api";
import { wait } from "~/utils/wait";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type UpdateProductProps = {
  props: RouterOutputs["product"]["getAll"][0];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UpdateProduct({ props, open, setOpen }: UpdateProductProps) {
  const { id, name, category, uom, countInStock, costPrice, salePrice } = props;

  const utils = api.useContext();
  const { toast } = useToast();

  const { mutate, isLoading, error } = api.product.update.useMutation({
    async onSuccess() {
      toast({
        title: "Succeed!",
        variant: "default",
        description: "Your product has been updated.",
      });
      /* auto-closed after succeed submit the dialog form */
      await wait().then(() => setOpen(!open));
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
    const category = formData.get("category") as Category;
    const uom = formData.get("uom") as UomType;
    const countInStock = formData.get("countInStock") as string;
    const costPrice = formData.get("costPrice") as string;
    const salePrice = formData.get("salePrice") as string;

    mutate({
      id,
      name,
      category,
      uom,
      countInStock: +countInStock,
      costPrice: +costPrice,
      salePrice: +salePrice,
    });
  };

  const disabled = false;

  return (
    <Sheet>
      <SheetTrigger className="flex w-full items-center">
        <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
        Edit
      </SheetTrigger>

      <SheetContent className="sm:max-w-1/2">
        <SheetHeader>
          <SheetTitle>Update Product</SheetTitle>
          <SheetDescription asChild>
            <p>
              Edit product
              <span className="px-1.5 font-medium uppercase text-amber-300">
                {name}
              </span>
              here. Click Update when you&apos;re done.
            </p>
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-3" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={name}
                placeholder="company name"
                className="col-span-3 capitalize"
              />
              {error?.data?.zodError?.fieldErrors.name && (
                <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.name}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select name="category" defaultValue={category}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Category.Product}>
                    {Category.Product}
                  </SelectItem>
                  <SelectItem value={Category.Service}>
                    {Category.Service}
                  </SelectItem>
                </SelectContent>
              </Select>
              {error?.data?.zodError?.fieldErrors.category && (
                <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.category}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="uom" className="text-right">
                UoM
              </Label>
              <Select name="uom" defaultValue={uom}>
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
                defaultValue={countInStock as unknown as string}
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="costPrice" className="text-right">
                Cost Price
              </Label>
              <Input
                id="costPrice"
                name="costPrice"
                defaultValue={costPrice as unknown as string}
                type="number"
                step="0.01"
                min={0}
                placeholder="cost price"
                className="col-span-3 capitalize"
              />
              {error?.data?.zodError?.fieldErrors.costPrice && (
                <span className="col-span-4 -mt-2.5 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.costPrice}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salePrice" className="text-right">
                Sale Price
              </Label>
              <Input
                id="salePrice"
                name="salePrice"
                defaultValue={salePrice as unknown as string}
                type="number"
                step="0.01"
                min={0}
                placeholder="sale price"
                className="col-span-3 capitalize"
              />
              {error?.data?.zodError?.fieldErrors.salePrice && (
                <span className="col-span-4 -mt-2.5 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.salePrice}
                </span>
              )}
            </div>
          </div>
          <SheetFooter className="mt-4 flex flex-row items-center justify-end space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              // onClick={() => void wait().then(() => setOpen(!open))}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            {isLoading ? (
              <Button disabled size="sm">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button disabled={disabled} type="submit" size="sm">
                Update
              </Button>
            )}
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );

  // wait for 800 miliseconds before close the dialog
  function handleCancel() {
    void wait(800).then(() => setOpen(!open));
  }
}
