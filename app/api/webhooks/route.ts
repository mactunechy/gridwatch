import { updateOrCreateWebhook } from "@/lib/dynamodb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { webhookUrl, area_name } = body;

    if (!webhookUrl)
      return new NextResponse("Webhook Url is required", { status: 400 });

    if (!area_name)
      return new NextResponse("Area name is required", { status: 400 });

    const user = await currentUser();

    const webhook = await updateOrCreateWebhook({
      webhookUrl,
      area_name,
      email: user?.emailAddresses[0].emailAddress as string,
    });

    return NextResponse.json(webhook);
  } catch (error) {
    console.log("[WEBHOOK_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
