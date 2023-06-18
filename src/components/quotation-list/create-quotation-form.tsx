import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { type z } from "zod";
import { cn } from "~/lib/utils";
import { createSaleSchema } from "~/types/schema";
import { Button } from "~/ui/button";
import { Calendar } from "~/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/ui/form";
import { Input } from "~/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";
import { ToastAction } from "~/ui/toast";
import { toast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { wait } from "~/utils/wait";
import { ScrollArea } from "../ui/scroll-area";
import { Fragment } from "react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateQuotationForm = ({ open, setOpen }: Props): JSX.Element => {
  // Queries
  const companiesQuery = api.company.companyList.useQuery();
  const usersQuery = api.user.getAll.useQuery();
  const productsQuery = api.product.getAll.useQuery();

  // Mutations
  const utils = api.useContext();

  const { mutate, isLoading, error } = api.sale.create.useMutation({
    async onSuccess() {
      toast({
        title: "Succeed!",
        variant: "default",
        description: "Your form has been created.",
      });

      await wait().then(() => setOpen(false));
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

  type CreateSaleSchema = z.infer<typeof createSaleSchema>;

  const defaultValues: CreateSaleSchema = {
    orderNumber: "123fd",
    dateOrdered: new Date(),
    companyId: "cliv5hhii0009xha5xvyuj8l1",
    userId: "clitzadn80000xhpo0ita97o8",
    status: "QUOTATION",
    orderItems: [
      {
        productId: "cliyaf7c80000xh7fsbtflunh",
        quantity: 12,
        description: "descrip",
      },
    ],
    totalPrice: 12345600,
  };

  const form = useForm<CreateSaleSchema>({
    resolver: zodResolver(createSaleSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "orderItems",
    control: form.control,
  });

  function onSubmit(values: z.infer<typeof createSaleSchema>) {
    const {
      orderNumber,
      dateOrdered,
      companyId,
      userId,
      status,
      orderItems,
      totalPrice,
    } = values;

    // const totalPrice = parseFloat(inputTotalPrice.replace(/,/g, ""));
    mutate({
      orderNumber,
      dateOrdered,
      companyId,
      userId,
      status,
      orderItems,
      totalPrice,
    });
  }

  const disabled = false;

  return (
    <Form {...form}>
      <form
        // *NOTE https://github.com/orgs/react-hook-form/discussions/8622
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
        className="space-y-8"
      >
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="orderNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order No</FormLabel>
                <FormControl>
                  <Input placeholder="Order No" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error?.data?.zodError?.fieldErrors.name && (
            <span className="col-span-4 -mt-2.5 text-right text-sm text-destructive">
              {error?.data?.zodError?.fieldErrors.name}
            </span>
          )}
        </div>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="dateOrdered"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Your date order.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companiesQuery.status === "success" &&
                      companiesQuery.data.map((company) => (
                        <SelectItem value={company.id} key={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {usersQuery.status === "success" &&
                      usersQuery.data.map((user) => (
                        <SelectItem value={user.id} key={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <ScrollArea onSelect={(e) => e.preventDefault()} className="h-96">
                <FormField
                  control={form.control}
                  name={`orderItems.${index}.productId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productsQuery.status === "success" &&
                            productsQuery.data.map((product) => (
                              <SelectItem value={product.id} key={product.id}>
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
                  name={`orderItems.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Quantity
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Add quantity.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`orderItems.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Description
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Add description.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ScrollArea>
            </Fragment>
          ))}
          <Button
            type="button"
            variant="link"
            size="sm"
            className="mt-1"
            onClick={() =>
              append({ productId: "", quantity: 0, description: "" })
            }
          >
            Add More
          </Button>
        </div>

        <div className="absolute bottom-16 right-8 w-full">
          <Button type="button" variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          {isLoading ? (
            <Button disabled className="w-1/3">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" disabled={disabled} size="lg">
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
