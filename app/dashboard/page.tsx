import React from "react";

import { WebhookClient } from "./components/client";
import { WebhookColumn } from "./components/columns";
import { Webhook } from "@/lib/types";
import { currentUser } from "@clerk/nextjs";
import { getWebhooks } from "@/lib/dynamodb";
import { areas } from "@/lib/utils";

const DashboardPage = async () => {
  const user = await currentUser();
  const webhooks: Webhook[] = await getWebhooks(
    user?.emailAddresses[0].emailAddress as string
  );

  const formattedWebhooks: WebhookColumn[] = webhooks.map((item) => ({
    webhookUrl: item.webhookUrl,
    area_name:
      areas.find((area) => area.area_name === item.area_name)?.area_label ||
      item.area_name,
    id: item.id,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <WebhookClient data={formattedWebhooks} />
      </div>
    </div>
  );
};

export default DashboardPage;
