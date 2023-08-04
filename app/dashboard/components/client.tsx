"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { WebhookColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface WebhookClientProps {
  data: WebhookColumn[];
}

export const WebhookClient: React.FC<WebhookClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Webhooks (${data.length})`}
          description="Manage your webhooks"
        />
        <Button onClick={() => router.push(`/dashboard/webhooks/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="area" columns={columns} data={data} />
    </>
  );
};
