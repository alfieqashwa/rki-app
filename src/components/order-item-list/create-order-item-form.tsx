import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { createOrderItemSchema } from "~/types/schema";
import { Button } from "~/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/ui/form";
import { Input } from "~/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";
import { Textarea } from "~/ui/textarea";
import { ToastAction } from "~/ui/toast";
import { toast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { calculateNewStock } from "~/utils/new-stock";
import { wait } from "~/utils/wait";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateOrderItemForm = ({ open, setOpen }: Props): JSX.Element => {
  // Queries
  const productsQuery = api.product.getAll.useQuery(undefined, {
    select: (p) => p.sort((a, b) => a.name.localeCompare(b.name)),
  });

  // Mutations
  const { query } = useRouter();
  const saleOrderId = query.id as string;
  const utils = api.useContext();

  const updateProductStockMutation = api.product.updateCountInStock.useMutation(
    {
      async onSuccess() {
        await utils.product.getAll.invalidate();
      },
    }
  );

  const { mutate, isLoading } = api.orderItem.create.useMutation({
    async onSuccess() {
      toast({
        title: "Succeed!",
        variant: "default",
        description: "Your form has been created.",
      });

      await wait().then(() => setOpen(false));
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

  type CreateOrderItemSchema = z.infer<typeof createOrderItemSchema>;

  const defaultValues: CreateOrderItemSchema = {
    productId: productsQuery.data?.[0]?.id as string,
    quantity: 0,
    description: "",
    saleOrderId,
  };

  const form = useForm<CreateOrderItemSchema>({
    resolver: zodResolver(createOrderItemSchema),
    defaultValues,
    mode: "onChange",
  });

  const getProductId = form.getValues("productId");
  const getCurrentStock = api.product.getById.useQuery(
    {
      id: getProductId,
    },
    {
      enabled: !!getProductId,
      select: (data) => data?.countInStock as number,
    }
  );

  function onSubmit(values: Partial<CreateOrderItemSchema>) {
    const productId = values.productId as string;
    const quantity = values.quantity as number;
    const description = values.description as string;

    // calculate new Stock In Count based on new updat update qty
    const CURRENT_QTY = 0 as const;
    const currentStock = getCurrentStock.data as number;
    const newStock = calculateNewStock(currentStock, CURRENT_QTY, quantity);

    if (newStock < 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `Not enough stock, Dude!`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      void updateProductStockMutation.mutateAsync({
        id: productId,
        countInStock: newStock,
      });
      mutate({
        saleOrderId,
        productId,
        quantity,
        description,
      });
    }
  }

  const disabled = false;

  return (
    <Form {...form}>
      <form
        // *NOTE https://github.com/orgs/react-hook-form/discussions/8622
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
        className="grid gap-4 py-4"
      >
        <div className="grid grid-cols-2 items-center">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4">
                <FormLabel className="mt-2 text-right">Product</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="col-span-3 w-[240px] capitalize">
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productsQuery.status === "success" &&
                      productsQuery.data.map((product) => (
                        <SelectItem
                          className="capitalize"
                          value={product.id}
                          key={product.id}
                        >
                          {product.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4">
                <FormLabel className="mt-2 text-right">Quantity</FormLabel>
                <FormControl>
                  <Input {...field} className="col-span-3 w-[240px]" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="relative mb-12 grid grid-cols-1 items-center">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid grid-cols-8 items-center gap-4">
                <FormLabel className="col-span-1 mt-2 text-right">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe about this order."
                    className="col-span-6 resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="absolute bottom-16 right-8 space-x-4">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" size="lg" disabled={disabled}>
              Submit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );

  // wait for 500 miliseconds before close the dialog
  function handleCancel() {
    void wait(500).then(() => setOpen(!open));
  }
};
