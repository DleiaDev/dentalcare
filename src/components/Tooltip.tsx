import React, { ReactNode } from "react";
import {
  TooltipProvider,
  Tooltip as TooltipUI,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

type Props = {
  content: string;
  children?: ReactNode;
  className?: string;
};

export default function Tooltip({ content, children, className }: Props) {
  return (
    <TooltipProvider delayDuration={300}>
      <TooltipUI>
        <TooltipTrigger asChild className={className}>
          {children}
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </TooltipUI>
    </TooltipProvider>
  );
}
