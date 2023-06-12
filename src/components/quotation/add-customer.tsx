import { FilePlus2 } from "lucide-react"
import { Button } from "~/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "~/ui/sheet"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

export const AddCustomer = (): JSX.Element => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button size="sm" variant="outline">
          <FilePlus2 className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="sm">
        <SheetHeader>
          <SheetTitle>Add New Customer</SheetTitle>
          <SheetDescription>
            Fill the form to create new customer and click the Submit button.
          </SheetDescription>
        </SheetHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <button>close</button>
              {/* <Button type="submit">Save changes</Button> */}
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
        // <Button size="sm" variant="outline">
        //   <FilePlus2 className="mr-2 h-4 w-4" />Add Customer</Button>