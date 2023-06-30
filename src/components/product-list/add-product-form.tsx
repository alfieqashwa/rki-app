import { type z } from "zod";
import { Category } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";
import { ToastAction } from "~/ui/toast";
import { toast } from "~/ui/use-toast";
import { wait } from "~/utils/wait";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UOM_TYPES } from "~/constants/uom-types";
import { formattedInputPriceValue } from "~/utils/formattedInputValue";
import { api } from "~/utils/api";
import { createProductSchema } from "~/types/schema";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddProductForm = ({ open, setOpen }: Props): JSX.Element => {
  // Mutations
  const utils = api.useContext();
  const { mutate, isLoading } = api.product.create.useMutation({
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

  type CreateProductSchema = z.infer<typeof createProductSchema>;

  const defaultValues: CreateProductSchema = {
    name: "",
    category: "Product",
    uom: "pack",
    countInStock: 0,
    costPrice: "",
    salePrice: "",
  };

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: CreateProductSchema) {
    const { name, category, uom, countInStock, costPrice, salePrice } = values;

    const costPriceFloat = parseFloat(costPrice.toString().replace(/,/g, ""));
    const salePriceFloat = parseFloat(salePrice.toString().replace(/,/g, ""));

    mutate({
      name,
      category,
      uom,
      countInStock: +countInStock,
      costPrice: costPriceFloat,
      salePrice: salePriceFloat,
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
            <FormItem className="grid grid-cols-6 items-center gap-x-4">
              <FormLabel className="mt-2 text-right">Category</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value}
              >
                <FormControl className="col-span-3 w-[240px] capitalize">
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Category.Product}>Product</SelectItem>
                  <SelectItem value={Category.Service}>Service</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="uom"
          render={({ field }) => (
            <FormItem className="grid grid-cols-6 items-center gap-x-4">
              <FormLabel className="mt-2 text-right">UoM</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value}
              >
                <FormControl className="col-span-3 w-[240px] capitalize">
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {UOM_TYPES.map((uom) => (
                    <SelectItem value={uom.value} key={uom.id}>
                      {uom.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <Input
                  {...field}
                  type="number"
                  className="col-span-3 w-[240px]"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="costPrice"
          render={({ field: { onChange, name, value } }) => (
            <FormItem className="grid grid-cols-6 items-center gap-x-4">
              <FormLabel className="mt-2 text-right">Cost Price</FormLabel>
              <FormControl>
                <Input
                  className="col-span-3 w-[240px]"
                  name={name}
                  value={formattedInputPriceValue(value)}
                  onChange={onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salePrice"
          render={({ field: { onChange, name, value } }) => (
            <FormItem className="grid grid-cols-6 items-center gap-x-4">
              <FormLabel className="mt-2 text-right">Sale Price</FormLabel>
              <FormControl>
                <Input
                  className="col-span-3 w-[240px]"
                  name={name}
                  value={formattedInputPriceValue(value)}
                  onChange={onChange}
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
            <Button type="submit" size="lg">
              Submit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
  function handleCancel() {
    void wait(500).then(() => setOpen(!open));
  }
};
