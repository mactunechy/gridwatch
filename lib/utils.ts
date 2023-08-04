import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const areas = [
  { area_name: "city-of-cape-town-area-1", area_label: "Capetown, Gardens" },
  { area_name: "city-of-cape-town-area-2", area_label: "Capetown, Maitland" },
  {
    area_name: "city-of-cape-town-area-3",
    area_label: "Capetown, Somerset West",
  },
  {
    area_name: "city-of-cape-town-area-4",
    area_label: "Capetown, Mitchells Plain",
  },
  { area_name: "city-of-cape-town-area-5", area_label: "Capetown, Newlands" },
];
