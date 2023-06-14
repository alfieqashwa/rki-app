import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { DataTableViewOptions } from "~/components/table/data-table-view-options";
import { Button } from "~/ui/button";
import { Input } from "~/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function PicTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter customer..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
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
