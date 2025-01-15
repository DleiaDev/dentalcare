import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function H3({ children, className }: Props) {
  return <h3 className={cn("text-2xl font-bold", className)}>{children}</h3>;
}
