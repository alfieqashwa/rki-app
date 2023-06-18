import { format } from "date-fns";
import {
  Building,
  Calendar as CalendarIcon,
  Loader2,
  MinusCircle,
  PlusCircle,
  User,
} from "lucide-react";
import { Fragment, useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/ui/button";
import { Calendar } from "~/ui/calendar";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/ui/sheet";
import { ToastAction } from "~/ui/toast";
import { toast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { formattedInputPriceValue } from "~/utils/formattedInputValue";
import { wait } from "~/utils/wait";
import { ScrollArea } from "../ui/scroll-area";

export const AddQuotation = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [inputOrderItemsFields, setInputOrderItemsFields] = useState([
    { productId: "", description: "", quantity: "" },
  ]);

  const [inputTotalPrice, setInputTotalPrice] = useState("");

  const handleTotalPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTotalPrice(formattedInputPriceValue(e.target.value));
  };

  // Queries
  const companiesQuery = api.company.companyList.useQuery();
  const usersQuery = api.user.getAll.useQuery();
  const productsQuery = api.product.getAll.useQuery();

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    type Values = {
      [key: string]: string;
      productId: string;
      description: string;
      quantity: string;
    };

    const values: Values[] = [...inputOrderItemsFields];
    // values[index][event.target.name] = event.target.value;

    (values[index] as Values)[event.target.name as keyof Values] =
      event.target.value;
    setInputOrderItemsFields([...values]);
  };

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const orderNumber = formData
      .get("orderNumber")
      ?.toString()
      .toLowerCase() as string;
    const companyId = formData.get("companyId") as string;
    const userId = formData.get("userId") as string;

    // TODO: Order Items
    // quantity
    // description
    // productId
    // saleOrderId

    // TODO: Total Price calculation (tax)
    const totalPrice = parseFloat(inputTotalPrice.replace(/,/g, ""));

    console.log({
      orderNumber,
      dateOrdered: date,
      companyId,
      userId,
      status: "QUOTATION",
      orderItems: inputOrderItemsFields,
      totalPrice,
    });
  };

  const disabled = false;
  // inputOrderItemsFields[0]?.quantity === "" ||
  // inputOrderItemsFields[0]?.description === "" ||
  // inputOrderItemsFields[0]?.productId === "";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild onSelect={(e) => e.preventDefault()}>
        <Button className="whitespace-nowrap">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Quotation
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="sm" className="w-2/3">
        <SheetHeader>
          <SheetTitle>Add New Quotation</SheetTitle>
          <SheetDescription>
            Fill the form to create new quotation and click the Submit button.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="orderNumber"
                  className="whitespace-nowrap text-right"
                >
                  Order No
                </Label>
                <Input
                  id="orderNumber"
                  name="orderNumber"
                  placeholder="order number"
                  className="col-span-3 capitalize"
                />
                {error?.data?.zodError?.fieldErrors.name && (
                  <span className="col-span-4 -mt-2.5 text-right text-sm text-destructive">
                    {error?.data?.zodError?.fieldErrors.name}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dateOrdered" className="text-right">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="companyId" className="text-right">
                  Customer
                </Label>
                <Select name="companyId">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {companiesQuery.status === "success" &&
                      companiesQuery.data.map((company) => (
                        <SelectItem
                          className="whitespace-nowrap pl-2 capitalize"
                          value={company.id}
                          key={company.id}
                        >
                          <div className="flex w-full items-center">
                            <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="whitespace-nowrap capitalize">
                              {company.name}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {error?.data?.zodError?.fieldErrors.companyId && (
                  <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                    {error?.data?.zodError?.fieldErrors.companyId}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="userId" className="text-right">
                  User
                </Label>
                <Select name="userId">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="User" />
                  </SelectTrigger>
                  <SelectContent>
                    {usersQuery.status === "success" &&
                      usersQuery.data.map((user) => (
                        <SelectItem
                          className="whitespace-nowrap pl-2 capitalize"
                          value={user.id}
                          key={user.id}
                        >
                          <div className="flex w-full items-center">
                            <User className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="whitespace-nowrap capitalize">
                              {user.name}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {error?.data?.zodError?.fieldErrors.userId && (
                  <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                    {error?.data?.zodError?.fieldErrors.userId}
                  </span>
                )}
              </div>
            </div>

            <SheetHeader className="mt-4">
              <SheetTitle>Order Item(s)</SheetTitle>
              <SheetDescription>
                Fill the form to create order item(s) button.
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-72 pr-6">
              {inputOrderItemsFields.map((input, i) => (
                <Fragment key={i}>
                  <div className="grid grid-cols-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="productId" className="text-right">
                        Product
                      </Label>
                      <select
                        name="productId"
                        value={input.productId}
                        onChange={(e) => handleChange(i, e)}
                      >
                        {productsQuery.status === "success" &&
                          productsQuery.data.map((product) => (
                            <option value={product.id} key={product.id}>
                              {product.name}
                            </option>
                          ))}
                      </select>

                      {error?.data?.zodError?.fieldErrors.productId && (
                        <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                          {error?.data?.zodError?.fieldErrors.productId}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Qty
                      </Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        value={input.quantity}
                        onChange={(e) => handleChange(i, e)}
                        placeholder="quantity"
                        className="col-span-3 capitalize"
                      />
                      {error?.data?.zodError?.fieldErrors.quantity && (
                        <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                          {error?.data?.zodError?.fieldErrors.quantity}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-7 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      value={input.description}
                      onChange={(e) => handleChange(i, e)}
                      placeholder="description"
                      className="col-span-6 capitalize"
                    />
                    {error?.data?.zodError?.fieldErrors.description && (
                      <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                        {error?.data?.zodError?.fieldErrors.description}
                      </span>
                    )}
                  </div>
                  <div className="mb-8 mt-4 flex w-full items-center justify-end space-x-4">
                    <Button
                      type="button"
                      disabled={inputOrderItemsFields.length === 1}
                      size="sm"
                      onClick={() => handleRemoveFields(i)}
                      className="w-16"
                    >
                      <MinusCircle />
                    </Button>
                    <Button
                      type="button"
                      disabled={
                        input.productId === "" ||
                        input.description === "" ||
                        input.quantity === ""
                      }
                      size="sm"
                      onClick={handleAddFields}
                      className="w-16"
                    >
                      <PlusCircle />
                    </Button>
                  </div>
                </Fragment>
              ))}
            </ScrollArea>
          </div>
          <SheetFooter className="absolute bottom-16 right-8 w-full">
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
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );

  function handleAddFields() {
    setInputOrderItemsFields([
      ...inputOrderItemsFields,
      { productId: "", quantity: "", description: "" },
    ]);
  }
  function handleRemoveFields(index: number) {
    const values = [...inputOrderItemsFields];
    values.splice(index, 1);
    setInputOrderItemsFields(values);
  }
  // wait for 800 miliseconds before close the dialog
  function handleCancel() {
    void wait(800).then(() => setOpen(!open));
  }
};
