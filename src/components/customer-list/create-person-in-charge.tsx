import { Loader2, MinusCircle, Pen, PlusCircle } from "lucide-react";
import { type ChangeEvent, Fragment, useState } from "react";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
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
import { useToast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { wait } from "~/utils/wait";

type Props = {
  id: string;
  customerName: string;
};

export function CreatePersonInCharge({ id, customerName }: Props) {
  const [open, setOpen] = useState(false);
  const [inputFields, setInputFields] = useState([
    { name: "", position: "", companyId: id },
  ]);
  const utils = api.useContext();
  const { toast } = useToast();

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    // console.log(`clicked::: `, index, event.target.value);
    type Values = {
      [key: string]: string;
      name: string;
      position: string;
      companyId: string;
    };

    const values: Values[] = [...inputFields];

    (values[index] as Values)[event.target.name as keyof Values] =
      event.target.value;
    setInputFields([...values]);
  };

  const { mutate, isLoading, error } = api.pic.createList.useMutation({
    async onSuccess() {
      toast({
        title: "Succeed!",
        variant: "default",
        description: "Your form has been created.",
      });
      /* auto-closed after succeed submit the dialog form */
      await wait().then(() => setOpen(!open));
      await utils.company.customerList.invalidate();
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
    mutate([...inputFields]);
  };

  const disabled =
    inputFields[0]?.name === "" || inputFields[0]?.position === "";
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
        Add PIC
      </SheetTrigger>

      <SheetContent className="sm:max-w-1/2">
        <SheetHeader>
          <SheetTitle>Create Person In Charge</SheetTitle>
          <SheetDescription asChild>
            <p>
              Create
              <span className="px-1.5 font-medium uppercase text-amber-300">
                {customerName}
              </span>
              PIC&apos;s here. Click Update when you&apos;re done.
            </p>
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-3" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {inputFields?.map((input, i) => (
              <Fragment key={i}>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    PIC
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={input.name}
                    onChange={(e) => handleChange(i, e)}
                    placeholder="pic name"
                    className="col-span-3 capitalize"
                  />
                  {error?.data?.zodError?.fieldErrors.name && (
                    <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                      {error?.data?.zodError?.fieldErrors.name}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right">
                    Position
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    value={input.position}
                    onChange={(e) => handleChange(i, e)}
                    placeholder="position"
                    className="col-span-3 capitalize"
                  />
                  {error?.data?.zodError?.fieldErrors.position && (
                    <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                      {error?.data?.zodError?.fieldErrors.position}
                    </span>
                  )}
                </div>
                <div
                  className={`flex w-full items-center justify-end space-x-4`}
                >
                  <Button
                    type="button"
                    disabled={inputFields.length === 1}
                    size="sm"
                    onClick={() => handleRemoveFields(i)}
                    className="w-16"
                  >
                    <MinusCircle />
                  </Button>
                  <Button
                    type="button"
                    disabled={
                      input.name === "" ||
                      input.position === "" ||
                      inputFields.length === 3
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
          </div>

          <SheetFooter className="absolute bottom-20 right-10 mt-4 flex flex-row items-center justify-end space-x-4">
            <Button type="button" variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button disabled={disabled} type="submit">
                Create
              </Button>
            )}
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );

  function handleRemoveFields(index: number) {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  }
  function handleCancel() {
    void wait(500).then(() => setOpen(!open));
  }
  function handleAddFields() {
    setInputFields([...inputFields, { name: "", position: "", companyId: id }]);
  }
}
