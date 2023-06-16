import { type ColumnDef } from "@tanstack/react-table";
import { Banknote, Layers, Package, Tag } from "lucide-react";
import { DataTableColumnHeader } from "~/components/table/data-table-column-header";
import { Checkbox } from "~/ui/checkbox";
import { type RouterOutputs } from "~/utils/api";
import { RowProductActions } from "./row-product-actions";
import { Tags } from "lucide-react";

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
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="whitespace-nowrap capitalize">
          {row.getValue("category")}
        </span>
      </div>
    ),
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "uom",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit of Measure" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Tags className="mr-2 h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("uom")}</span>
      </div>
    ),
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
  {
    accessorKey: "costPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cost Price" />
    ),
    cell: ({ row }) => {
      const costPrice = row.getValue("costPrice");
      const formatPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(Number(costPrice));
      return (
        <div className="flex items-center">
          <Banknote className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap capitalize">{formatPrice}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "salePrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sale Price" />
    ),
    cell: ({ row }) => {
      const salePrice = row.getValue("salePrice");
      const formatPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(Number(salePrice));
      return (
        <div className="flex items-center">
          <Banknote className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap capitalize">{formatPrice}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowProductActions {...row.original} />,
  },
];
