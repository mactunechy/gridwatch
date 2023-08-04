"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { LogColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface LogClientProps {
  data: LogColumn[];
}

export const LogClient: React.FC<LogClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Logs (${data.length})`}
          description="Requests sent to the webhook"
        />
      </div>
      <Separator />
      <DataTable
        searchKey="area"
        columns={columns}
        data={data}
        disableSearch={true}
      />
    </>
  );
};
