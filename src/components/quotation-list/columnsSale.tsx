import { type ColumnDef } from "@tanstack/react-table";
import { Banknote, Building, Package, Tag, User } from "lucide-react";
import { DataTableColumnHeader } from "~/components/table/data-table-column-header";
import { Checkbox } from "~/ui/checkbox";
import { type RouterOutputs } from "~/utils/api";
import { RowSaleActions } from "./row-sale-actions";
import id from "date-fns/locale/id";
import { format } from "date-fns";

export const columnsSale: ColumnDef<RouterOutputs["sale"]["getAll"][number]>[] =
  [
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
      accessorKey: "orderNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order No" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <Package className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap capitalize">
            {row.getValue("orderNumber")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "dateOrdered",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date Order" />
      ),
      cell: ({ row }) => {
        const formattedDateOrder = format(row.getValue("dateOrdered"), "PPPP", {
          locale: id,
        });
        return (
          <div className="flex items-center">
            <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="whitespace-nowrap capitalize">
              {formattedDateOrder}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value: string) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "company",
      accessorFn: (row) => row.company?.name,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <Building className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("company")}</span>
        </div>
      ),
      filterFn: (row, id, value: string) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "user",
      accessorFn: (row) => row.user?.name,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <User className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap capitalize">
            {row.getValue("user")}
          </span>
        </div>
      ),
      filterFn: (row, id, value: string) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "orderItems",
      accessorFn: (row) => row.orderItems?.map((order) => order.id),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order Items" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <Banknote className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="whitespace-nowrap capitalize">
              {row.getValue("orderItems")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "totalPrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Price" />
      ),
      cell: ({ row }) => {
        const totalPrice = row.getValue("totalPrice");
        const formatPrice = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(Number(totalPrice));
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
      cell: ({ row }) => <RowSaleActions {...row.original} />,
    },
  ];
