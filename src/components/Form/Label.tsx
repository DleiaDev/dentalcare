import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    {...props}
    className={cn("font-semibold text-sm mb-2 block", className)}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export default Label;
