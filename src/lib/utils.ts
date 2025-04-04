import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const statusStyles = {
  success: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
};

export const VAT = 0.12;

export const measurementUnits = [
  { label: "Pieces", value: "PCS" },
  { label: "Litre", value: "LT" },
  { label: "Milliliter", value: "ML" },
  { label: "Meter", value: "MTR" },
  { label: "Kilograms", value: "KG" },
  { label: "Centimeters", value: "CM" },
  { label: "Unit", value: "UNIT" },
  { label: "Hours", value: "H" },
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
}
