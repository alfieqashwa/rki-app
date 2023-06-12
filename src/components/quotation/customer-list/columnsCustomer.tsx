import type { ColumnDef } from "@tanstack/react-table";
import { format, formatDistance, subDays } from "date-fns";
import { MapPin, Star } from "lucide-react";
import { DataTableColumnHeader } from "~/components/table/data-table-column-header";
import { Checkbox } from "~/ui/checkbox";
import type { RouterOutputs } from "~/utils/api";
import { RowCustomerActions } from "./row-customer-actions";
// import { RowEventActions } from "./row-event-actions";

export const columnsCustomer: ColumnDef<
  RouterOutputs["company"]["customerList"][0]
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
        <Star className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="whitespace-nowrap capitalize">
          {row.getValue("name")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "postalCode",
    accessorFn: (row) => row.address.postalCode,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Postal Code"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="uppercase">{row.getValue("postalCode")}</span>
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "street",
    accessorFn: (row) => row.address.street,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Street" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap capitalize">
            {row.getValue("street")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "province",
    accessorFn: (row) => row.address.province,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Province" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap capitalize">
            {row.getValue("province")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "regency",
    accessorFn: (row) => row.address.regency,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Regency" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap capitalize">
            {row.getValue("regency")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "district",
    accessorFn: (row) => row.address.district,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="District" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap capitalize">
            {row.getValue("district")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "village",
    accessorFn: (row) => row.address.village,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Village" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="whitespace-nowrap capitalize">
            {row.getValue("village")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Created At"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {format(row.getValue("createdAt"), "PPPpp" /*{ locale: id } */)}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Updated At"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const date = formatDistance(
        subDays(row.getValue("updatedAt"), 0),
        new Date(),
        {
          addSuffix: true,
          // locale: id,
        }
      );
      return <div className="whitespace-nowrap">{date}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const {
        original: {
          id,
          name,
          status,
          personInCharges,
          address,
          addressId,
          createdAt,
          updatedAt,
        },
      } = row;
      return (
        <RowCustomerActions
          id={id}
          name={name}
          status={status}
          personInCharges={personInCharges}
          address={address}
          addressId={addressId}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
      );
    },
  },
];
