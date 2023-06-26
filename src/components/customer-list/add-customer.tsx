import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { CommandCombobox } from "~/components/combobox";
import {
  type District,
  type Province,
  type Regency,
  type Village,
} from "~/types/address";
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
  const provincesQuery = api.address.provinces.useQuery(undefined, {
    select: (data: Province[]) =>
      data.sort((a, b) => a.name.localeCompare(b.name)),
  });
  const provincesData = provincesQuery.data as Province[];

  const provinceId = provincesData?.find(
    (province) => province.name.toLowerCase() === provinceValue
  )?.id as string;

  const regenciesQuery = api.address.regencies.useQuery(
    { provinceId },
    {
      enabled: provinceValue !== "" && !!provinceId,
      select: (regencies: Regency[]) =>
        regencies
          .filter((d) => d.province_id === provinceId)
          .sort((a, b) => a.name.localeCompare(b.name)),
    }
  );

  const regencyId = regenciesQuery?.data?.find(
    (regency) => regency.name.toLowerCase() === regencyValue
  )?.id as string;

  const districtsQuery = api.address.districts.useQuery(
    { regencyId },
    {
      enabled: regencyValue !== "" && !!regencyId,
      select: (districts: District[]) =>
        districts
          .filter((district) => district.regency_id === regencyId)
          .sort((a, b) => a.name.localeCompare(b.name)),
    }
  );

  const districtId = districtsQuery?.data?.find(
    (district) => district.name.toLowerCase() === districtValue
  )?.id as string;

  const villagesQuery = api.address.villages.useQuery(
    { districtId },
    {
      enabled: districtValue !== "" && !!districtId,
      select: (villages: Village[]) =>
        villages
          .filter((village) => village.district_id === districtId)
          .sort((a, b) => a.name.localeCompare(b.name)),
    }
  );

  // Mutations
  const utils = api.useContext();

  const { mutate, isLoading, error } = api.company.createCustomer.useMutation({
    async onSuccess() {
      toast({
        title: "Succeed!",
        variant: "default",
        description: "Your form has been created.",
      });

      await wait().then(() => setOpen(false));
      await utils.company.customerList.invalidate();
      setProvinceValue("");
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

    mutate({
      name,
      phone,
      street,
      province: provinceValue,
      regency: regencyValue,
      district: districtValue,
      village: villageValue,
      postalCode,
    });
  };

  const disabled = villageValue === "";
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild onSelect={(e) => e.preventDefault()}>
        <Button className="whitespace-nowrap">
          <PlusCircle className="mr-2 h-4 w-4" />
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
                className="col-span-3 w-[240px] capitalize"
              />
              {error?.data?.zodError?.fieldErrors.name && (
                <span className="col-span-4 -mt-2.5 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.name}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="phone number"
                className="col-span-3 w-[240px] capitalize"
              />
              {error?.data?.zodError?.fieldErrors.phone && (
                <span className="col-span-4 -mt-2.5 text-right text-sm text-destructive">
                  {error?.data?.zodError?.fieldErrors.phone}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="street" className="text-right">
                Street
              </Label>
              <Input
                id="street"
                name="street"
                placeholder="street"
                className="col-span-3 w-[240px] capitalize"
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
                datas={provincesData}
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
                className="col-span-3 w-[240px]"
              />
              {error?.data?.zodError?.fieldErrors.postalCode && (
                <span className="col-span-4 -mt-2.5 text-right text-xs text-destructive">
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
              <Button type="submit" disabled={disabled} size="lg">
                Submit
              </Button>
            )}
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
