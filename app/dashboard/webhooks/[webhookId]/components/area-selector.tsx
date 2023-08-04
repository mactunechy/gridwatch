"use client";

import { Check, ChevronsUpDown, Store as StoreIcon } from "lucide-react";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { areas, cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  onAreaSelect: (area: { label: string; value: string }) => void;
  value: string;
}

export const AreaSelector = ({
  className,
  onAreaSelect,
  value,
}: StoreSwitcherProps) => {
  const [open, setOpen] = useState(false);

  const formattedItems = areas.map((item) => ({
    label: item.area_label,
    value: item.area_name,
  }));

  const currentArea = formattedItems.find((item) => item.value === value);

  return (
    <div className="block">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="h-10">
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Select area"
            className={cn("w-[200px] justify-between mr-4", className)}
          >
            <StoreIcon className="mr-2 h-4 w-4" />
            {currentArea?.label}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search area..." />
              <CommandEmpty>No store found</CommandEmpty>
              <CommandGroup heading="Areas">
                {formattedItems.map((area) => (
                  <CommandItem
                    key={area.value}
                    onSelect={() => onAreaSelect(area)}
                    className="text-sm"
                  >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {area.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentArea?.value === area.value
                          ? "oppacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
