import { Loader2, Trash } from "lucide-react";
import { Button } from "~/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog";
import { ToastAction } from "~/ui/toast";
import { useToast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { wait } from "~/utils/wait";

type Props = {
  id: string;
  name: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DeleteSale({ id, name, open, setOpen }: Props) {
  const utils = api.useContext();
  const { toast } = useToast();

  // Queries
  const { data: products } = api.product.getAll.useQuery();
  const { data: orderItems } = api.sale.getById.useQuery(
    { id },
    {
      enabled: !!id,
      select: (data) => data?.orderItems,
    }
  );

  // Mutations
  const updateProductStockMutation =
    api.product.updateCountInStock.useMutation();

  const { mutate, isLoading } = api.sale.deleteQuotation.useMutation({
    async onSuccess() {
      orderItems?.forEach((orderItem) => {
        const product = products?.find((p) => p.id === orderItem.productId);

        if (product && product.countInStock) {
          void updateProductStockMutation.mutateAsync({
            id: product.id,
            // add each stock with qty's back to previous amount when the quot-order has been deleted
            countInStock: (product.countInStock += orderItem.quantity),
          });
        }
        return;
      });
      toast({
        title: "Succeed!",
        variant: "default",
        description: "Your quotation has been deleted.",
      });
      /* auto-closed after succeed submit the dialog form */
      await wait().then(() => setOpen(!open));
      await utils.sale.getAll.invalidate();
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

    mutate({
      id,
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
        Delete
      </DialogTrigger>

      <DialogContent className="sm:max-w-1/2">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Are You Sure?</DialogTitle>
            <DialogDescription asChild>
              <p>
                You can&apos;t undo this changes. Click delete when you&apos;re
                sure to delete quotation
                <span className="px-1.5 font-medium uppercase text-amber-300">
                  {name}.
                </span>
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex flex-row items-center justify-end space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            {isLoading ? (
              <Button disabled variant="destructive" size="sm">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" variant="destructive" size="sm">
                Delete
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
  // wait for 500 miliseconds before close the dialog
  function handleCancel() {
    void wait(500).then(() => setOpen(!open));
  }
}
