import { FilePlus2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
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
import { useToast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { wait } from "~/utils/wait";

export function AddPic() {
  const [open, setOpen] = useState(false);
  const utils = api.useContext();
  const { toast } = useToast();

  const companyQuery = api.company.companyList.useQuery();

  const { mutate, isLoading, error } = api.pic.create.useMutation({
    async onSuccess() {
      toast({
        title: "Succeed!",
        variant: "default",
        description: "Your form has been created.",
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
    const companyId = formData.get("companyId") as string;
    mutate({
      name,
      position,
      companyId,
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild onSelect={(e) => e.preventDefault()}>
        <Button size="sm" variant="outline" className="whitespace-nowrap">
          <FilePlus2 className="mr-2 h-4 w-4" />
          Add Person in Charge
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-1/2">
        <SheetHeader>
          <SheetTitle>Create Person In Charge</SheetTitle>
          <SheetDescription asChild>
            <p>Create new PIC here. Click Create when you&apos;re done.</p>
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-3" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                PIC
              </Label>
              <Input
                id="name"
                name="name"
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
                placeholder="position"
                className="col-span-3 capitalize"
              />
              {error?.data?.zodError?.fieldErrors.position && (
                <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.position}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Company
              </Label>
              <Select name="companyId">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  {companyQuery.status === "success" &&
                    companyQuery.data &&
                    companyQuery.data.map((company) => (
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
              {error?.data?.zodError?.fieldErrors.status && (
                <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.status}
                </span>
              )}
            </div>
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
              <Button type="submit">Create</Button>
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
