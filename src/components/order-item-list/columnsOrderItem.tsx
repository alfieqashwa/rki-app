import { type ColumnDef } from "@tanstack/react-table";
import { Package } from "lucide-react";
import { DataTableColumnHeader } from "~/components/table/data-table-column-header";
import { Checkbox } from "~/ui/checkbox";
import { type RouterOutputs } from "~/utils/api";
import { RowOrderItemActions } from "./row-order-item-actions";

export const columnsOrderItem: ColumnDef<
  RouterOutputs["orderItem"]["getAllOrderItemBySaleId"][number]
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
    accessorKey: "product",
    accessorFn: (row) => row.product.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Package className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="whitespace-nowrap capitalize">
          {row.getValue("product")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Package className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="whitespace-nowrap capitalize">
          {row.getValue("description")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Qty" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Package className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="whitespace-nowrap capitalize">
          {row.getValue("quantity")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "uom",
    accessorFn: (row) => row.product.uom,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UoM" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Package className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="whitespace-nowrap capitalize">
          {row.getValue("uom")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "salePrice",
    accessorFn: (row) => row.product.salePrice,
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
          <Package className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap capitalize">{formatPrice}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const {
        original: {
          quantity,
          product: { salePrice },
        },
      } = row;
      const amount = salePrice * quantity;
      const formatAmount = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(Number(amount));
      return (
        <div className="flex items-center">
          <Package className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap capitalize">{formatAmount}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowOrderItemActions {...row.original} />,
  },
];
