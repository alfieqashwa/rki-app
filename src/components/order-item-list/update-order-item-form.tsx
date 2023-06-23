import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { orderItemSchema } from "~/types/schema";
import { Button } from "~/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/ui/form";
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
import { api, type RouterOutputs } from "~/utils/api";
import { wait } from "~/utils/wait";

type Props = {
  data: RouterOutputs["orderItem"]["getbyId"];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateOrderItemForm = ({
  data,
  open,
  setOpen,
}: Props): JSX.Element => {
  // Queries
  const productsQuery = api.product.getAll.useQuery();

  // Mutations
  const utils = api.useContext();

  const { mutate, isLoading } = api.orderItem.update.useMutation({
    async onSuccess() {
      toast({
        title: "Succeed!",
        variant: "default",
        description: "Your form has been updated.",
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

  type OrderItemSchema = z.infer<typeof orderItemSchema>;

  const defaultValues: Partial<OrderItemSchema> = {
    id: data?.id as string,
    productId: data?.productId as string,
    quantity: data?.quantity as number,
    description: data?.description as string,
  };

  const form = useForm<OrderItemSchema>({
    resolver: zodResolver(orderItemSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: OrderItemSchema) {
    const { productId, quantity, description } = values;
    const id = data?.id as string;

    mutate({
      id,
      productId,
      quantity,
      description,
    });
  }

  const disabled = false;

  return (
    <Form {...form}>
      <form
        // *NOTE https://github.com/orgs/react-hook-form/discussions/8622
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
        className="grid gap-4"
      >
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem className="grid grid-cols-6 items-center gap-4">
              <FormLabel className="mt-2 text-right">Customer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="grid grid-cols-6 items-center gap-x-4">
              <FormLabel className="mt-2 text-right">Quantity</FormLabel>
              <FormControl>
                <Input {...field} className="col-span-3 w-[240px]" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grid grid-cols-6 items-center gap-4">
              <FormLabel className="mt-2 text-right">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe about this order."
                  className="col-span-5 resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="absolute bottom-8 right-8 space-x-2">
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

  // wait for 800 miliseconds before close the dialog
  function handleCancel() {
    void wait(800).then(() => setOpen(!open));
  }
};
