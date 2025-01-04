"use client";

import useSpinner from "@/hooks/useSpinner";
import Spinner from "@/icons/Spinner";
import { cn } from "@/lib/utils";

type Props = {
  position?: "fixed" | "absolute";
  className?: string;
  containerClassName?: string;
};

export default function SpinnerOverlay({
  position = "fixed",
  className,
  containerClassName,
}: Props) {
  const { isShown } = useSpinner();

  console.log(isShown);

  if (!isShown) return null;

  return (
    <div
      className={cn(
        "bg-white/50 top-0 left-0 w-full h-full z-[51] flex items-center justify-center animate-in fade-in rounded-xl",
        position,
        containerClassName,
      )}
    >
      <Spinner className={cn("text-primary w-16 h-16", className)} />
    </div>
  );
}
