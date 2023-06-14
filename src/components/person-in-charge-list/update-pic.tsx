import { Loader2, Pen } from "lucide-react";
import { useState } from "react";
import { CommandCombobox } from "~/components/combobox";
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
  name: string;
  position: string | null;
};

export function UpdatePic({ id, name, position }: Props) {
  const [open, setOpen] = useState(false);

  const utils = api.useContext();
  const { toast } = useToast();

  const { mutate, isLoading, error } = api.pic.update.useMutation({
    async onSuccess() {
      toast({
        title: "Succeed!",
        variant: "default",
        description: "Your form has been updated.",
      });
      /* auto-closed after succeed submit the dialog form */
      await wait().then(() => setOpen(!open));
      await utils.pic.picList.invalidate();
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
    const name = formData.get("name")?.toString().toLowerCase() as string;
    const position = formData
      .get("position")
      ?.toString()
      .toLowerCase() as string;

    mutate({
      id,
      name,
      position,
    });
  };

  const disabled = false;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
        Edit
      </SheetTrigger>

      <SheetContent className="sm:max-w-1/2">
        <SheetHeader>
          <SheetTitle>Update Customer</SheetTitle>
          <SheetDescription asChild>
            <p>
              Edit
              <span className="px-1.5 font-medium uppercase text-amber-300">
                {name}
              </span>
              of your customer here. Click Update when you&apos;re done.
            </p>
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-3" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={name}
                placeholder="name"
                className="col-span-3 capitalize"
              />
              {error?.data?.zodError?.fieldErrors.name && (
                <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.name}
                </span>
              )}
            </div>

            {!!position && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Phone
                </Label>
                <Input
                  id="position"
                  name="position"
                  defaultValue={position}
                  placeholder="position"
                  className="col-span-3 capitalize"
                />
                {error?.data?.zodError?.fieldErrors.position && (
                  <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                    {error?.data?.zodError?.fieldErrors.position}
                  </span>
                )}
              </div>
            )}
          </div>
          <SheetFooter className="mt-4 flex flex-row items-center justify-end space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              // onClick={() => void wait().then(() => setOpen(!open))}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            {isLoading ? (
              <Button disabled size="sm">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button disabled={disabled} type="submit" size="sm">
                Update
              </Button>
            )}
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );

  // wait for 800 miliseconds before close the dialog
  function handleCancel() {
    void wait(800).then(() => setOpen(!open));
  }
}
