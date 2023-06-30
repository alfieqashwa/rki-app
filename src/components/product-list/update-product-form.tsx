import { zodResolver } from "@hookform/resolvers/zod";
import { Category, UomType } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UOM_TYPES } from "~/constants/uom-types";
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
import { ToastAction } from "~/ui/toast";
import { toast } from "~/ui/use-toast";
import { api, type RouterOutputs } from "~/utils/api";
import { formattedInputPriceValue } from "~/utils/formattedInputValue";
import { wait } from "~/utils/wait";

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

  const productSchema = z.object({
    id: z.string().cuid(),
    name: z
      .string()
      .min(3, {
        message: "at least have 3 characters",
      })
      .max(20),
    category: z.nativeEnum(Category, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "Please select one of the options" };
          case "invalid_enum_value":
            return { message: "Invalid value." };
          default:
            return { message: "This is a mandatory fields" };
        }
      },
    }),
    uom: z.nativeEnum(UomType, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "Please select one of the options" };
          case "invalid_enum_value":
            return { message: "Invalid value." };
          default:
            return { message: "This is a mandatory fields" };
        }
      },
    }),
    countInStock: z.coerce.number(),
    costPrice: z.string(),
    salePrice: z.string(),
  });

  type ProductSchema = z.infer<typeof productSchema>;

  const defaultValues: ProductSchema = {
    id: data?.id as string,
    name: data?.name as string,
    category: data?.category as Category,
    uom: data?.uom as UomType,
    countInStock: data?.countInStock as number,
    costPrice: data?.costPrice.toString() as string,
    salePrice: data?.salePrice.toString() as string,
  };

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: ProductSchema) {
    const { id, name, category, uom, countInStock, costPrice, salePrice } =
      values;

    const costPriceFloat = parseFloat(costPrice.toString().replace(/,/g, ""));
    const salePriceFloat = parseFloat(salePrice.toString().replace(/,/g, ""));

    mutate({
      id,
      name,
      category,
      uom,
      countInStock,
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
            <FormItem className="grid grid-cols-6 items-center gap-4">
              <FormLabel className="mt-2 text-right">Category</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value as Category)}
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
            <FormItem className="grid grid-cols-6 items-center gap-4">
              <FormLabel className="mt-2 text-right">UoM</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value as UomType)}
                defaultValue={field.value}
              >
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

  // wait for 500 miliseconds before close the dialog
  function handleCancel() {
    void wait(500).then(() => setOpen(!open));
  }
}
