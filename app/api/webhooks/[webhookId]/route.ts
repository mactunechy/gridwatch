import { removeWebhook, updateOrCreateWebhook } from "@/lib/dynamodb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { webhookId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const webhook = await removeWebhook(params.webhookId);

    return NextResponse.json(webhook, { status: 201 });
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,

  { params }: { params: { webhookId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { url, area_name } = body;

    if (!url) return new NextResponse("Url is required", { status: 400 });

    if (!area_name)
      return new NextResponse("Area name is required", { status: 400 });

    const user = await currentUser();

    const webhook = await updateOrCreateWebhook({
      webhookUrl: url,
      area_name,
      id: params.webhookId,
      email: user?.emailAddresses[0].emailAddress as string,
    });

    return NextResponse.json(webhook);
  } catch (error) {
    console.log("[WEBHOOK_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
