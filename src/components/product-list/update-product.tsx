import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/ui/sheet";
import { api } from "~/utils/api";
import { UpdateProductForm } from "./update-product-form";
import { Pen } from "lucide-react";

type UpdateProductProps = {
  id: string;
  name: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UpdateProduct({ id, name, open, setOpen }: UpdateProductProps) {
  const { data, status } = api.product.getById.useQuery(
    { id },
    { enabled: !!id }
  );

  return (
    <Sheet>
      <SheetTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
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
        {status === "success" && (
          <UpdateProductForm data={data} open={open} setOpen={setOpen} />
        )}
      </SheetContent>
    </Sheet>
  );
}
