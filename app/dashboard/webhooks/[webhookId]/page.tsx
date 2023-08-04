import React from "react";
import { WebhookForm } from "../../components/webhook-form";
import { getLogs, getWebhook } from "@/lib/dynamodb";
import { Log } from "@/lib/types";
import { LogClient } from "./components/client";

const WebhookPage = async ({ params }: { params: { webhookId: string } }) => {
  const isNew = params.webhookId === "new";
  const webhook = isNew ? null : await getWebhook(params.webhookId);
  const logs = isNew ? [] : await getLogs(webhook?.webhookUrl as string);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <WebhookForm initialData={webhook} />
      </div>
      {webhook && (
        <div className="flex-1 space-y-4 p-8 pt-6">
          <LogClient data={logs} />
        </div>
      )}
    </div>
  );
};

export default WebhookPage;
