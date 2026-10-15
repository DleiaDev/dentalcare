import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function ErrorMessage({ children, className, id }: Props) {
  return (
    <div
      id={id}
      className={cn("font-semibold text-error text-sm mt-2", className)}
    >
      {children}
    </div>
  );
}
