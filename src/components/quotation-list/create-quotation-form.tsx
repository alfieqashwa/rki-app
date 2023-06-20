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
import { Separator } from "~/ui/separator";
import { Textarea } from "~/ui/textarea";
import { ToastAction } from "~/ui/toast";
import { toast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { wait } from "~/utils/wait";
import { ScrollArea } from "../ui/scroll-area";
import { useSession } from "next-auth/react";
import { formattedOrderNumber } from "~/utils/formattedOrderNumber";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateQuotationForm = ({ open, setOpen }: Props): JSX.Element => {
  // Queries
  const session = useSession();
  const userIdfromSession = session.data?.user.id as string;
  const companiesQuery = api.company.companyList.useQuery();
  const usersQuery = api.user.getAll.useQuery();
  const productsQuery = api.product.getAll.useQuery();
  const getAllSaleOrderNumberQuery = api.sale.getAll.useQuery(undefined, {
    select: (data) => data.map((data) => data.orderNumber),
  });

  // Mutations
  const utils = api.useContext();

  const { mutate, isLoading } = api.sale.create.useMutation({
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
    orderNumber: "defaultquotation",
    dateOrdered: new Date(),
    companyId: companiesQuery.data?.[0]?.id as string,
    userId: userIdfromSession,
    status: "QUOTATION",
    orderItems: [
      {
        productId: productsQuery.data?.[0]?.id as string,
        quantity: 0,
        description: "",
      },
    ],
    totalPrice: 123456,
  };

  const form = useForm<CreateSaleSchema>({
    resolver: zodResolver(createSaleSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "orderItems",
    control: form.control,
  });

  function onSubmit(values: z.infer<typeof createSaleSchema>) {
    const { dateOrdered, companyId, userId, status, orderItems, totalPrice } =
      values;

    // generate orderNumber
    const generateOrderNumber = formattedOrderNumber(dateOrdered);

    // find order number based on dateOrdered
    const hasSameOrderNumber =
      getAllSaleOrderNumberQuery.status === "success" &&
      getAllSaleOrderNumberQuery.data.some((orderNum) => {
        const len = orderNum.length;
        return orderNum.slice(0, len - 4) === format(dateOrdered, "yyyyMMdd");
      });

    // find the latest order number based on the orderedNumber
    const generateNewOrderNumber =
      getAllSaleOrderNumberQuery.data &&
      getAllSaleOrderNumberQuery.data
        .filter(
          (f) => f.slice(0, f.length - 4) === format(dateOrdered, "yyyMMdd")
        )
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))[0];

    const orderNumber = hasSameOrderNumber
      ? formattedOrderNumber(generateNewOrderNumber)
      : generateOrderNumber;

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
        className="grid gap-4 py-4"
      >
        <div className="grid grid-cols-2 items-center">
          <FormField
            control={form.control}
            name="dateOrdered"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="mt-2 text-right">Date</FormLabel>
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
                  <PopoverContent className="p-2" align="start">
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
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 items-center">
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="mt-2 text-right">Customer</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="col-span-3 w-[240px] capitalize">
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companiesQuery.status === "success" &&
                      companiesQuery.data.map((company) => (
                        <SelectItem
                          className="capitalize"
                          value={company.id}
                          key={company.id}
                        >
                          {company.name}
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
            name="userId"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="mt-2 text-right">User</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="col-span-3 w-[240px]">
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
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
              </FormItem>
            )}
          />
        </div>
        <ScrollArea className="max-h-[36rem]">
          {fields.map((field, index) => (
            <section className="grid gap-4 py-4" key={field.id}>
              <h1 className="text-lg font-semibold">
                Order Item <span>{index + 1}</span>
              </h1>
              <div className="grid grid-cols-2 items-center">
                <FormField
                  control={form.control}
                  name={`orderItems.${index}.productId`}
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
                  name={`orderItems.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4">
                      <FormLabel className="mt-2 text-right">
                        Quantity
                      </FormLabel>
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
                  name={`orderItems.${index}.description`}
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
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={index === 0}
                  onClick={() => remove(index)}
                  className={cn(
                    "absolute -bottom-12 right-40",
                    index === 0 && "hidden"
                  )}
                >
                  Remove
                </Button>
              </div>
              <Separator />
            </section>
          ))}
        </ScrollArea>
        <Button
          type="button"
          variant="link"
          size="sm"
          onClick={() =>
            append({ productId: "", quantity: 0, description: "" })
          }
        >
          Add More
        </Button>

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

  // wait for 800 miliseconds before close the dialog
  function handleCancel() {
    void wait(800).then(() => setOpen(!open));
  }
};
