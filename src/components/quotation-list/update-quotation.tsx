import { Pen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog";
import { api } from "~/utils/api";
import { UpdateQuotationForm } from "./update-quotation-form";

type Props = {
  id: string;
  orderNumber: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateQuotation = ({
  id,
  orderNumber,
  open,
  setOpen,
}: Props): JSX.Element => {
  const { data, status } = api.sale.getById.useQuery({ id }, { enabled: !!id });
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      >
        <div>
          <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Edit
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Order No: <span>{orderNumber}</span>
          </DialogTitle>
          <DialogDescription>
            Fill the form to update quotation and click the Submit button.
          </DialogDescription>
        </DialogHeader>
        {status === "success" && (
          <UpdateQuotationForm data={data} open={open} setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};
