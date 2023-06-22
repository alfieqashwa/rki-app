import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { cn } from "~/lib/utils";
import { updateSaleSchema } from "~/types/schema";
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
import { api, type RouterOutputs } from "~/utils/api";
import { wait } from "~/utils/wait";

type Props = {
  data: RouterOutputs["sale"]["getById"];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateQuotationForm = ({
  data,
  open,
  setOpen,
}: Props): JSX.Element => {
  // Queries
  const companiesQuery = api.company.companyList.useQuery();
  const usersQuery = api.user.getAll.useQuery();

  // Mutations
  const utils = api.useContext();

  const { mutate, isLoading } = api.sale.update.useMutation({
    async onSuccess() {
      toast({
        title: "Succeed!",
        variant: "default",
        description: "Your form has been updated.",
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

  type UpdateSaleSchema = z.infer<typeof updateSaleSchema>;

  const defaultValues: Partial<UpdateSaleSchema> = {
    id: data?.id as string,
    dateOrdered: data?.dateOrdered as Date,
    companyId: data?.companyId as string,
    userId: data?.user.id as string,
  };

  const form = useForm<UpdateSaleSchema>({
    resolver: zodResolver(updateSaleSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof updateSaleSchema>) {
    const { dateOrdered, companyId, userId } = values;
    const id = data?.id as string;

    mutate({
      id,
      dateOrdered,
      companyId,
      userId,
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
          name="dateOrdered"
          render={({ field }) => (
            <FormItem className="grid grid-cols-6 items-center gap-4">
              <FormLabel className="mt-2 text-right">Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl onSelect={(e) => e.preventDefault()}>
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

        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem className="grid grid-cols-6 items-center gap-4">
              <FormLabel className="mt-2 text-right">Customer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            <FormItem className="grid grid-cols-6 items-center gap-4">
              <FormLabel className="mt-2 text-right">User</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <div className="mt-6 space-x-2 text-right">
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
