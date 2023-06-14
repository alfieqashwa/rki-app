import { type PersonInCharge } from "@prisma/client";
import { Users } from "lucide-react";
import { Button } from "~/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";
import { Separator } from "~/ui/separator";
import { CreatePersonInCharge } from "./create-person-in-charge";

type Props = {
  customerId: string;
  customerName: string;
  personInCharges: PersonInCharge[];
};

export function PicList({ customerId, customerName, personInCharges }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-10 rounded-full p-0">
          <Users className="h-4 w-4" />
          <span className="sr-only">Open PIC</span>
        </Button>
      </PopoverTrigger>
      {personInCharges.length > 0 ? (
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Person in Charge</h4>
              <p className="text-sm text-muted-foreground">
                PiC&apos;s of{" "}
                <span className="whitespace-nowrap capitalize">
                  {customerName}
                </span>
                .
              </p>
            </div>
            {personInCharges?.map((pic) => (
              <div className="grid gap-2" key={pic.id}>
                <div className="grid grid-cols-3 items-center gap-4">
                  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Name
                  </p>
                  <p className="col-span-2 h-8 capitalize">{pic.name}</p>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Position
                  </p>
                  <p className="col-span-2 h-8 capitalize">{pic.position}</p>
                </div>
                <Separator />
              </div>
            ))}
            <div className="mt-3">
              <CreatePersonInCharge
                id={customerId}
                customerName={customerName}
              />
            </div>
          </div>
        </PopoverContent>
      ) : (
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Person in Charge</h4>
              <p className="text-sm text-muted-foreground">
                None of Person in Charge (PiC) are found.
              </p>
            </div>
          </div>
          <div className="mt-3">
            <CreatePersonInCharge id={customerId} customerName={customerName} />
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
