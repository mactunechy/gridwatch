"use client";

import { Copy, MoreHorizontal } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Log } from "@/lib/types";

interface CellActionsProps {
  data: Log;
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const onCopy = (data: string) => {
    navigator.clipboard.writeText(data);
    toast.success("Webhook copied to clipboard.");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8 p-0" variant={"ghost"}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.requestPayload)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy request Payload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.responseData)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Response Payload
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
