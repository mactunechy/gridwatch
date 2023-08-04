"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";

export type LogColumn = {
  timestamp: string;
  requestPayload: string;
  responseStatus: number;
  responseData: string;
};

export const columns: ColumnDef<LogColumn>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "requestPayload",
    header: "Request Payload",
  },
  {
    accessorKey: "responseData",
    header: "Response",
  },
  {
    accessorKey: "responseStatus",
    header: "Status Code",
    cell: ({ row }) => (
      <div
        className={
          row.original.responseStatus === 200
            ? "text-green-600"
            : "text-red-600"
        }
      >
        {row.original.responseStatus}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
