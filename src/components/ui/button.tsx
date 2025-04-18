import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        fill: "shadow-sm",
        outline: "border shadow-sm",
        ghost: "",
        text: "",
      },
      color: {
        primary:
          "border-primary bg-primary text-primary hover:bg-primary-light",
        gray: "border-gray-600 bg-gray-600 text-gray-600 hover:bg-gray-700",
        destructive:
          "border-destructive bg-destructive text-destructive hover:destructive-light",
        white: "border-white bg-white text-gray-700 hover:bg-gray-300",
        black: "border-gray-900 bg-gray-900 text-gray-900 hover:bg-gray-300",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        base: "h-9 px-4 py-2 text-base",
        icon: "h-9 w-9 text-base",
        lg: "h-10 px-8 text-base",
        xl: "h-11 px-12 text-base",
        "2xl": "h-12 px-12 text-lg",
        "3xl": "h-14 px-14 text-xl",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      {
        variant: "fill",
        className: "text-primary-foreground",
      },
      {
        variant: "fill",
        color: "white",
        className: "text-gray-700",
      },
      {
        variant: "outline",
        className: "bg-transparent",
      },
      {
        variant: "outline",
        color: "primary",
        className: "hover:bg-accent",
      },
      {
        variant: "ghost",
        className: "bg-transparent",
      },
      {
        variant: "ghost",
        color: "primary",
        className: "hover:bg-accent",
      },
      {
        variant: "ghost",
        color: "destructive",
        className: "hover:bg-error/10",
      },
      {
        variant: "text",
        className: "h-auto w-auto p-0 bg-transparent hover:bg-transparent",
      },
      {
        variant: "text",
        color: "primary",
        className: "text-primary hover:text-primary-light",
      },
      {
        variant: "text",
        color: "gray",
        className: "text-gray-600 hover:text-gray-500",
      },
      {
        variant: "text",
        color: "destructive",
        className: "text-destructive hover:text-destructive-light",
      },
    ],
    defaultVariants: {
      variant: "fill",
      color: "primary",
      size: "base",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      asChild = false,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, color, size, className }))}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
