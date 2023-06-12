import { FilePlus2, Loader2 } from "lucide-react";
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
import { toast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { wait } from "~/utils/wait";

export const AddCustomer = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [provinceValue, setProvinceValue] = useState("");
  const [regencyValue, setRegencyValue] = useState("");
  const [districtValue, setDistrictValue] = useState("");
  const [villageValue, setVillageValue] = useState("");

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

  // Mutations
  const utils = api.useContext();

  const { mutate, isLoading, error } = api.company.create.useMutation({
    async onSuccess() {
      toast({
        title: "Succeed!",
        variant: "default",
        description: "Your form has been created.",
      });

      await utils.company.customerList.invalidate();
      await wait().then(() => setOpen(false));
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
    const street = formData.get("street")?.toString().toLowerCase() as string;
    const postalCode = formData.get("postalCode") as string;

    mutate({
      name,
      street,
      province: provinceValue,
      regency: regencyValue,
      district: districtValue,
      village: villageValue,
      postalCode,
    });
  };

  const disabled = villageValue === "";
  console.log({ provinceValue, regencyValue, districtValue, villageValue });
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild onSelect={(e) => e.preventDefault()}>
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
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="company name"
                className="col-span-3 capitalize"
              />
              {error?.data?.zodError?.fieldErrors.name && (
                <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.name}
                </span>
              )}
            </div>
            {/* //! DO NOT REMOVE THIS COMMENTED-OUT BELOW!! */}
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select name="status">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Company Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
                  <SelectItem value="SUPPLIER">SUPPLIER</SelectItem>
                  <SelectItem value="BOTH">BOTH</SelectItem>
                  <SelectItem value="NONE">NONE</SelectItem>
                </SelectContent>
              </Select>
              {error?.data?.zodError?.fieldErrors.status && (
                <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.status}
                </span>
              )}
            </div> */}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="street" className="text-right">
                Street
              </Label>
              <Input
                id="street"
                name="street"
                placeholder="street"
                className="col-span-3 capitalize"
              />
              {error?.data?.zodError?.fieldErrors.street && (
                <span className="col-span-4 -mt-4 text-right text-sm text-destructive">
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
                placeholder="postal code"
                className="col-span-3"
              />
              {error?.data?.zodError?.fieldErrors.postalCode && (
                <span className="col-span-4 -mt-4 text-right text-xs text-destructive">
                  {error?.data?.zodError?.fieldErrors.postalCode}
                </span>
              )}
            </div>
          </div>
          <SheetFooter className="absolute bottom-16 right-8 w-full">
            {isLoading ? (
              <Button disabled className="w-1/3">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={disabled} className="w-1/3">
                Submit
              </Button>
            )}
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
