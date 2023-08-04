"use client";

import { Trash } from "lucide-react";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { Webhook } from "@/lib/types";
import { AreaSelector } from "../webhooks/[webhookId]/components/area-selector";

const formSchema = z.object({
  webhookUrl: z.string().min(1),
  area_name: z.string().min(1),
});

interface WebhookFormProps {
  initialData: Webhook | null;
}

type WebhookFormValues = z.infer<typeof formSchema>;

export const WebhookForm: React.FC<WebhookFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Webhook" : "Create webhook";
  const description = initialData ? "Edit a webhook" : "Add a new webhook";
  const toastMessage = initialData ? "Webhook updated." : "Webhook created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<WebhookFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      webhookUrl: "",
      area_name: "",
    },
  });

  const onSubmit = async (values: WebhookFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/webhooks/${params.webhookId}`, values);
      } else {
        await axios.post(`/api/webhooks`, values);
      }

      router.refresh();
      router.push(`/dashboard`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/webhooks/${params.webhookId}`);

      router.refresh();
      router.push(`/dashboard`);
      toast.success("Webhook deleted.");
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this webhook first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={onDelete}
      />
      <div className="flex item-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="webhookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="https://"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <AreaSelector
                      onAreaSelect={(item) => field.onChange(item.value)}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading}>{action}</Button>
        </form>
      </Form>
    </>
  );
};
