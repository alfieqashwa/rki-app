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
import { calculateNewStock } from "~/utils/new-stock";
import { wait } from "~/utils/wait";

type Props = {
  id: string;
  name: string;
  currentQty: number;
  productId: string;
  currentStockInCount: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DeleteOrderItem({
  id,
  name,
  currentQty,
  productId,
  currentStockInCount,
  open,
  setOpen,
}: Props) {
  const utils = api.useContext();
  const { toast } = useToast();

  // Mutations
  const updateProductStockMutation = api.product.updateCountInStock.useMutation(
    {
      async onSuccess() {
        await utils.product.getAll.invalidate();
      },
    }
  );

  const { mutate, isLoading } = api.orderItem.delete.useMutation({
    async onSuccess() {
      toast({
        title: "Succeed!",
        variant: "default",
        description: "Your order item has been deleted.",
      });
      /* auto-closed after succeed submit the dialog form */
      await wait().then(() => setOpen(!open));
      await utils.orderItem.getAllOrderItemBySaleId.invalidate();
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

    const UPDATED_QTY = 0 as const;

    const newStock = calculateNewStock(
      currentStockInCount,
      currentQty,
      UPDATED_QTY
    );
    // just in case, but actually no-need this validation on delete.
    if (newStock < 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `Product ${name} is not enough stock, Dude!`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      void updateProductStockMutation.mutateAsync({
        id: productId,
        countInStock: newStock,
      });
      mutate({
        id,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center">
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
                sure to delete product
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
  function handleCancel() {
    void wait(800).then(() => setOpen(!open));
  }
}
