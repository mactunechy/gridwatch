"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";
import Link from "next/link";

export type WebhookColumn = {
  webhookUrl: string;
  area_name: string;
  id: string;
};

export const columns: ColumnDef<WebhookColumn>[] = [
  {
    accessorKey: "url",
    header: "Webhook Url",
    cell: ({ row }) => (
      <Link href={`/dashboard/webhooks/${row.original.id}`}>
        {row.original.webhookUrl}
      </Link>
    ),
  },
  {
    accessorKey: "area_name",
    header: "Area",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
