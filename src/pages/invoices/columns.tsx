"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Receipt } from "@/lib/types";
import { cn, statusStyles } from "@/lib/utils";

import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";

export const columns: ColumnDef<Receipt>[] = [
  {
    accessorKey: "invoiceNum",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Invoice No.
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const invoiceNum = row.getValue("invoiceNum") as string;
      return <div className="font-bold lowercase">#{invoiceNum}</div>;
    },
  },
  {
    accessorKey: "isVAT",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          VAT
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isVAT = row.getValue("isVAT") as boolean;
      return (
        <div className="w-fit text-xs font-bold tracking-wider uppercase">
          {isVAT ? "Yes" : "No"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <div
          className={cn(
            "w-fit rounded px-2 py-1 text-xs font-bold tracking-wider uppercase",
            statusStyles[status as keyof typeof statusStyles],
          )}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "registeredName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Registered Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("registeredName")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date")).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return <div className="lowercase">{date}</div>;
    },
  },
  {
    accessorKey: "cashSales",
    header: "Cash Sales",
    cell: ({ row }) => {
      const cashSales = row.getValue("cashSales") as boolean;
      return (
        <div className="w-fit text-xs font-bold tracking-wider uppercase">
          {cashSales ? "Yes" : "No"}
        </div>
      );
    },
  },
  {
    accessorKey: "chargeSales",
    header: "Charge Sales",
    cell: ({ row }) => {
      const chargeSales = row.getValue("chargeSales") as boolean;
      return (
        <div className="w-fit text-xs font-bold tracking-wider uppercase">
          {chargeSales ? "Yes" : "No"}
        </div>
      );
    },
  },
  {
    accessorKey: "receiptTotal",
    header: ({ column }) => (
      <Button
        className="ml-auto block p-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="flex items-center gap-2">
          Amount
          <ArrowUpDown />
        </span>
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("receiptTotal"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);

      return (
        <div className="text-right font-bold text-emerald-500">{formatted}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const receipt = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="sr-only">Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(`#${receipt.invoiceNum}`)
              }
            >
              Copy receipt number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/dashboard/invoices/${receipt.$id}`}>
                View payment details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
