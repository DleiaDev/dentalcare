import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function ErrorMessage({ children, className }: Props) {
  return (
    <div className={cn("font-semibold text-error text-sm mt-2", className)}>
      {children}
    </div>
  );
}
