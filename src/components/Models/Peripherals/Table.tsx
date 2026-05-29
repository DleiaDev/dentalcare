"use client";

import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Peripheral } from "@prisma/client";

type Order = {
  id: string;
  items: number;
  amount: string;
  created: string;
  vendor: string;
  status: "PENDING" | "COMPLETE" | "PARTIALLY RECEIVED";
  received: string;
  isCompleted: boolean;
  progress: number;
};

const orders: Order[] = [
  {
    id: "#OS12KOS",
    items: 2,
    amount: "$2,000",
    created: "July 14, 2015",
    vendor: "Barone LLC.",
    status: "PENDING",
    received: "0/3",
    isCompleted: false,
    progress: 0,
  },
  {
    id: "#OS19KOK",
    items: 2,
    amount: "$1,500",
    created: "October 30, 2017",
    vendor: "Acme Co.",
    status: "PENDING",
    received: "0/3",
    isCompleted: false,
    progress: 0,
  },
  {
    id: "#OS14KOC",
    items: 2,
    amount: "$630",
    created: "October 24, 2018",
    vendor: "Abstargo Ltd.",
    status: "COMPLETE",
    received: "3/3",
    isCompleted: true,
    progress: 100,
  },
  {
    id: "#OS10KOT",
    items: 2,
    amount: "$2,000",
    created: "March 6, 2018",
    vendor: "Binford Ltd.",
    status: "PENDING",
    received: "0/3",
    isCompleted: false,
    progress: 0,
  },
  {
    id: "#OS01KOH",
    items: 2,
    amount: "$1,000",
    created: "February 11, 2014",
    vendor: "Acme Co.",
    status: "PARTIALLY RECEIVED",
    received: "2/4",
    isCompleted: false,
    progress: 50,
  },
  {
    id: "#OS18KOG",
    items: 2,
    amount: "$2,100",
    created: "October 31, 2017",
    vendor: "Dentalku",
    status: "COMPLETE",
    received: "3/3",
    isCompleted: true,
    progress: 100,
  },
  {
    id: "#OS21KOD",
    items: 2,
    amount: "$1,560",
    created: "March 13, 2014",
    vendor: "Acme Co.",
    status: "COMPLETE",
    received: "3/3",
    isCompleted: true,
    progress: 100,
  },
  {
    id: "#OS22KOF",
    items: 2,
    amount: "$900",
    created: "December 2, 2018",
    vendor: "Biffco Enterprises",
    status: "COMPLETE",
    received: "3/3",
    isCompleted: true,
    progress: 100,
  },
];

export default function PeripheralTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    (): ColumnDef<Peripheral>[] => [
      {
        accessorKey: "id",
        header: "ORDER",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("id")}</div>
        ),
      },
      {
        header: "CREATED",
        cell: (info) => info.getValue(),
      },
      {
        header: "VENDOR",
        cell: (info) => (
          <div className="flex items-center">
            <Building2 className="h-4 w-4 mr-2 text-gray-400" />
            {info.getValue()}
          </div>
        ),
      },
      {
        header: "STATUS",
        cell: (info) => {
          const status = info.getValue();
          return (
            <Badge
              variant="outline"
              className={`
              ${status === "PENDING" ? "text-blue-600 border-blue-200 bg-blue-50" : ""}
              ${status === "COMPLETE" ? "text-green-600 border-green-200 bg-green-50" : ""}
              ${status === "PARTIALLY RECEIVED" ? "text-purple-600 border-purple-200 bg-purple-50" : ""}
            `}
            >
              {status}
            </Badge>
          );
        },
      },
      {
        header: "RECEIVED",
        cell: (info) => {
          const { progress, received } = info.row.original;
          return (
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-500">{received}</span>
            </div>
          );
        },
      },
      {
        header: "IS COMPLETED",
        cell: (info) => {
          return info.getValue() ? (
            <div className="flex justify-center">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ) : null;
        },
      },
      {
        id: "actions",
        cell: (info) => {
          const { isCompleted } = info.row.original;
          return (
            <div className="flex justify-between items-center">
              <Button
                variant={isCompleted ? "outline" : "fill"}
                size="sm"
                className={
                  isCompleted
                    ? "text-gray-500 bg-gray-100"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              >
                Receive
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5Z"
                        fill="#6B7280"
                      />
                      <path
                        d="M8 3.5C8.82843 3.5 9.5 2.82843 9.5 2C9.5 1.17157 8.82843 0.5 8 0.5C7.17157 0.5 6.5 1.17157 6.5 2C6.5 2.82843 7.17157 3.5 8 3.5Z"
                        fill="#6B7280"
                      />
                      <path
                        d="M8 15.5C8.82843 15.5 9.5 14.8284 9.5 14C9.5 13.1716 8.82843 12.5 8 12.5C7.17157 12.5 6.5 13.1716 6.5 14C6.5 14.8284 7.17157 15.5 8 15.5Z"
                        fill="#6B7280"
                      />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Edit order</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: orders,
    columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-200">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="font-medium"
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    cursor: header.column.getCanSort() ? "pointer" : "default",
                  }}
                >
                  <div className="flex items-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getCanSort() &&
                      header.column.getIsSorted() !== false && (
                        <span className="ml-1">
                          {header.column.getIsSorted() === "asc" ? (
                            <ArrowDown className="h-4 w-4" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : null}
                        </span>
                      )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
