import { Avatar as AvatarMain, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function Avatar({ className }: Props) {
  return (
    <AvatarMain className={cn(className)}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>MI</AvatarFallback>
    </AvatarMain>
  );
}
