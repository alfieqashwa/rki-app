import { Pen } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/ui/sheet";
import { api } from "~/utils/api";
import { UpdateOrderItemForm } from "./update-order-item-form";

type Props = {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateOrderItem = ({ id, open, setOpen }: Props): JSX.Element => {
  const { data, status } = api.orderItem.getbyId.useQuery(
    { id },
    { enabled: !!id }
  );

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      >
        <div>
          <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Edit
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Product Name: <span>{data?.product.name}</span>
          </SheetTitle>
          <SheetDescription>
            Fill the form to update quotation and click the Submit button.
          </SheetDescription>
        </SheetHeader>
        {status === "success" && (
          <UpdateOrderItemForm data={data} open={open} setOpen={setOpen} />
        )}
      </SheetContent>
    </Sheet>
  );
};
