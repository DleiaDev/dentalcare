import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Errors({ children, className }: Props) {
  return (
    <div className={cn("font-semibold text-error text-sm", className)}>
      {children}
    </div>
  );
}
