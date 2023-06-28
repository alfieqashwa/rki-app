import { zodResolver } from "@hookform/resolvers/zod";
import { Category, type UomType } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { UOM_TYPES } from "~/constants/uom-types";
import { updateProductSchema } from "~/types/schema";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";
import { ToastAction } from "~/ui/toast";
import { useToast } from "~/ui/use-toast";
import { api, type RouterOutputs } from "~/utils/api";
import { wait } from "~/utils/wait";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/ui/form";

type UpdateProductFormProps = {
  data: RouterOutputs["product"]["getById"];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UpdateProductForm({
  data,
  open,
  setOpen,
}: UpdateProductFormProps) {
  const utils = api.useContext();
  const { toast } = useToast();

  const { mutate, isLoading } = api.product.update.useMutation({
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

  type UpdateProductSchema = z.infer<typeof updateProductSchema>;

  const defaultValues: UpdateProductSchema = {
    id: data?.id as string,
    name: data?.name as string,
    category: data?.category as Category,
    uom: data?.uom as UomType,
    countInStock: data?.countInStock as number,
    costPrice: data?.costPrice as number,
    salePrice: data?.salePrice as number,
  };

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: UpdateProductSchema) {
    const { id, name, category, uom, countInStock, costPrice, salePrice } =
      values;

    mutate({
      id,
      name,
      category,
      uom,
      countInStock,
      costPrice,
      salePrice,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
        className="grid gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-6 items-center gap-x-4">
              <FormLabel className="mt-2 text-right">Name</FormLabel>
              <FormControl>
                <Input {...field} className="col-span-3 w-[240px]" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
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
                  <SelectItem className="capitalize" value={Category.Product}>
                    {Category.Product}
                  </SelectItem>
                  <SelectItem className="capitalize" value={Category.Service}>
                    {Category.Service}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="uom"
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
                  {UOM_TYPES.map((uom) => (
                    <SelectItem
                      className="capitalize"
                      value={uom.value}
                      key={uom.id}
                    >
                      {uom.name}
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
          name="countInStock"
          render={({ field }) => (
            <FormItem className="grid grid-cols-6 items-center gap-x-4">
              <FormLabel className="mt-2 text-right">Stock</FormLabel>
              <FormControl>
                <Input {...field} className="col-span-3 w-[240px]" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="costPrice"
          render={({ field }) => (
            <FormItem className="grid grid-cols-6 items-center gap-x-4">
              <FormLabel className="mt-2 text-right">Cost Price</FormLabel>
              <FormControl>
                <Input {...field} className="col-span-3 w-[240px]" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salePrice"
          render={({ field }) => (
            <FormItem className="grid grid-cols-6 items-center gap-x-4">
              <FormLabel className="mt-2 text-right">Sale Price</FormLabel>
              <FormControl>
                <Input {...field} className="col-span-3 w-[240px]" />
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
            <Button type="submit" size="lg">
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
}
