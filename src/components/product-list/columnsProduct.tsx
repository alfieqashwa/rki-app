import { Checkbox } from "@radix-ui/react-checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import { Layers, Package, Tag } from "lucide-react";
import { type RouterOutputs } from "~/utils/api";
import { DataTableColumnHeader } from "~/components/table/data-table-column-header";

export const columnsProduct: ColumnDef<
  RouterOutputs["product"]["getAll"][number]
>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Package className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="whitespace-nowrap capitalize">
          {row.getValue("name")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "uom",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit of Measure" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="whitespace-nowrap capitalize">
          {row.getValue("uom")}
        </span>
      </div>
    ),
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "countInStock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Count In Stock" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="whitespace-nowrap capitalize">
          {row.getValue("countInStock")}
        </span>
      </div>
    ),
  },
];
