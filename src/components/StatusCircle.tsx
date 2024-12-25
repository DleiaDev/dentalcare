import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function StatusCircle({ className, ...props }: Props) {
  return (
    <div
      className={cn("rounded-full min-w-5 min-h-5", className)}
      {...props}
    ></div>
  );
}
