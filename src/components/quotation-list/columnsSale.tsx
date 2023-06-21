import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { Building, Package, Tag, User } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "~/components/table/data-table-column-header";
import { Button } from "~/ui/button";
import { Checkbox } from "~/ui/checkbox";
import { type RouterOutputs } from "~/utils/api";
import { RowSaleActions } from "./row-sale-actions";

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
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader
          className="whitespace-nowrap"
          column={column}
          title="Order Items"
        />
      ),
      cell: ({ row }) => {
        const id = row.getValue("id");
        return (
          <Button variant="link" className="flex items-center">
            <Link href={`/sale/${id as string}`}>Detail</Link>
          </Button>
        );
      },
    },
    {
      id: "actions",
      cell: ({
        row: {
          original: { id, orderNumber },
        },
      }) => <RowSaleActions id={id} orderNumber={orderNumber} />,
    },
  ];
