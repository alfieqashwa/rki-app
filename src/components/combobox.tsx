import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { cn } from "~/lib/utils";
import {
  type District,
  type Province,
  type Regency,
  type Village,
} from "~/types/address";
import { Button } from "~/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";

type CommandComboboxProps = {
  datas?: Province[] | Regency[] | District[] | Village[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
};

export function CommandCombobox({
  datas,
  value,
  setValue,
  placeholder,
}: CommandComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-60 justify-between whitespace-nowrap"
        >
          {!!value
            ? datas?.find((data) => data.name === value?.toUpperCase())?.name
            : `Select ${placeholder}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder}...`} />
          <CommandEmpty>No select found.</CommandEmpty>
          <CommandGroup>
            {datas?.map((data) => (
              <CommandItem
                key={data.id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value?.toUpperCase() === data.name
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {data.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
