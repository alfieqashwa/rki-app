import type { Table } from "@tanstack/react-table";
import { Building, User, X } from "lucide-react";
import { DataTableFacetedFilter } from "~/components/table/data-table-faceted-filter";
import { DataTableViewOptions } from "~/components/table/data-table-view-options";
import { type Options } from "~/types";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";
import { api } from "~/utils/api";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function SaleTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  const companies = api.company.companyList.useQuery(undefined, {
    select: (data) =>
      data.map((d) => ({
        value: d.name,
        label: d.name,
        icon: Building,
      })),
  });

  const users = api.user.getAll.useQuery(undefined, {
    select: (users) =>
      users.map((user) => ({
        value: user.name,
        label: user.name,
        icon: User,
      })),
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Order No..."
          value={
            (table.getColumn("orderNumber")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("orderNumber")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {companies.status === "success" && table.getColumn("company") && (
          <DataTableFacetedFilter
            column={table.getColumn("company")}
            title="Company"
            options={companies.data as Options[]}
          />
        )}
        {users.status === "success" && table.getColumn("user") && (
          <DataTableFacetedFilter
            column={table.getColumn("user")}
            title="User"
            options={users.data as Options[]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <span className="flex items-center space-x-4">
        <DataTableViewOptions table={table} />
      </span>
    </div>
  );
}
