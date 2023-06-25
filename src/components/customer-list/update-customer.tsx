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
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UpdateCustomer({ id, open, setOpen }: Props) {
  const { data: customer } = api.company.getCompanyById.useQuery(
    { id },
    { enabled: !!id }
  );

  const [provinceValue, setProvinceValue] = useState(
    customer?.address.province as string
  );
  const [regencyValue, setRegencyValue] = useState(
    customer?.address.regency as string
  );
  const [districtValue, setDistrictValue] = useState(
    customer?.address.district as string
  );
  const [villageValue, setVillageValue] = useState(
    customer?.address.village as string
  );

  // Queries

  const provincesQuery = api.address.provinces.useQuery();

  const provinceId = provincesQuery?.data?.find(
    (province) => province.name.toLowerCase() === provinceValue
  )?.id;

  const regenciesQuery = api.address.regencies.useQuery(undefined, {
    enabled: provinceValue !== "" || provinceId != undefined,
    select: (data) => data.filter((d) => d.provinceId === provinceId),
  });

  const regencyId = regenciesQuery?.data?.find(
    (regency) => regency.name.toLowerCase() === regencyValue
  )?.id;

  const districtsQuery = api.address.districts.useQuery(undefined, {
    enabled: regencyValue !== "" || regencyId != undefined,
    select: (data) => data.filter((d) => d.regencyId === regencyId),
  });

  const districtId = districtsQuery?.data?.find(
    (district) => district.name.toLowerCase() === districtValue
  )?.id;

  const villagesQuery = api.address.villages.useQuery(undefined, {
    enabled: districtValue !== "" || districtId != undefined,
    select: (data) => data.filter((d) => d.districtId === districtId),
  });

  const villageId = villagesQuery?.data?.find(
    (village) => village.name.toLowerCase() === villageValue
  )?.id;

  const utils = api.useContext();
  const { toast } = useToast();

  // Mutations
  const { mutate, isLoading, error } =
    api.company.updateCompanyById.useMutation({
      async onSuccess() {
        toast({
          title: "Succeed!",
          variant: "default",
          description: "Your form has been updated.",
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

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().toLowerCase() as string;
    const phone = formData.get("phone") as string;
    const street = formData.get("street")?.toString().toLowerCase() as string;
    const postalCode = formData.get("postalCode") as string;
    const province = provinceValue;
    const regency = regencyValue;
    const district = districtValue;
    const village = villageValue;

    mutate({
      id,
      name,
      phone,
      street,
      province,
      regency,
      district,
      village,
      postalCode,
    });
  };

  const disabled =
    !provinceId ||
    !regencyId ||
    !districtId ||
    !villageId ||
    villageValue === "";

  return (
    <Sheet>
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
                {customer?.name}
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
                defaultValue={customer?.name}
                placeholder="company name"
                className="col-span-3 capitalize"
              />
              {error?.data?.zodError?.fieldErrors.name && (
                <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.name}
                </span>
              )}
            </div>

            {!!customer?.phone && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={customer.phone}
                  placeholder="phone number"
                  className="col-span-3 capitalize"
                />
                {error?.data?.zodError?.fieldErrors.phone && (
                  <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                    {error?.data?.zodError?.fieldErrors.phone}
                  </span>
                )}
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="street" className="text-right">
                Street
              </Label>
              <Input
                id="street"
                name="street"
                defaultValue={customer?.address.street}
                placeholder="street"
                className="col-span-3 capitalize"
              />
              {error?.data?.zodError?.fieldErrors.street && (
                <span className="col-span-4 -mt-2.5 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.street}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="province" className="text-right">
                Province
              </Label>
              <CommandCombobox
                datas={provincesQuery.data}
                value={provinceValue}
                setValue={setProvinceValue}
                placeholder="province"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="regency" className="text-right">
                Regency
              </Label>
              <CommandCombobox
                datas={regenciesQuery.data}
                value={regencyValue}
                setValue={setRegencyValue}
                placeholder="regency"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="district" className="text-right">
                District
              </Label>
              <CommandCombobox
                datas={districtsQuery.data}
                value={districtValue}
                setValue={setDistrictValue}
                placeholder="district"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="village" className="text-right">
                Village
              </Label>
              <CommandCombobox
                datas={villagesQuery.data}
                value={villageValue}
                setValue={setVillageValue}
                placeholder="village"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="postalCode" className="text-right">
                Postal Code
              </Label>
              <Input
                id="postalCode"
                name="postalCode"
                defaultValue={customer?.address.postalCode}
                placeholder="postal code"
                className="col-span-3"
              />
              {error?.data?.zodError?.fieldErrors.postalCode && (
                <span className="col-span-4 -mt-2.5 text-right text-xs text-destructive">
                  {error?.data?.zodError?.fieldErrors.postalCode}
                </span>
              )}
            </div>
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
