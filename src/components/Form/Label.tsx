import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";

type Props = ComponentProps<typeof LabelPrimitive.Root> & {
  description?: string;
};

export default function Label({
  children,
  description,
  className,
  ref,
  ...props
}: Props) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        "flex items-center gap-1 font-semibold text-sm mb-2",
        className,
      )}
      {...props}
    >
      {children}
      {description && (
        <span className={cn("text-gray-600")}>{description}</span>
      )}
    </LabelPrimitive.Root>
  );
}
