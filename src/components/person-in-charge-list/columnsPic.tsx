import type { ColumnDef } from "@tanstack/react-table";
import { Building, Star, User } from "lucide-react";
import { DataTableColumnHeader } from "~/components/table/data-table-column-header";
import { Checkbox } from "~/ui/checkbox";
import type { RouterOutputs } from "~/utils/api";
import { RowPicActions } from "./row-pic-actions";

export const columnsPic: ColumnDef<RouterOutputs["pic"]["picList"][0]>[] = [
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
        <User className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="whitespace-nowrap capitalize">
          {row.getValue("name")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Star className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="whitespace-nowrap capitalize">
          {row.getValue("position")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "company",
    accessorFn: (row) => row.company.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Building className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap capitalize">
            {row.getValue("company")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const {
        original: {
          id,
          name,
          position,
          company: { name: companyName },
        },
      } = row;
      return (
        <RowPicActions
          id={id}
          name={name}
          position={position}
          companyName={companyName}
        />
      );
    },
  },
];
