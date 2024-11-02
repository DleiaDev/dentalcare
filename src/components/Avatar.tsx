import Image, { ImageProps } from "next/image";
import { Avatar as AvatarMain, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

export type Props = {
  className?: string;
  fallback?: boolean;
  imageProps: Omit<ImageProps, "src"> & {
    src?: string;
  };
};

export default function Avatar({
  className,
  imageProps,
  fallback = true,
}: Props) {
  return (
    <AvatarMain className={cn(className)}>
      <AvatarImage asChild src={imageProps.src}>
        {imageProps.src && (
          <Image {...imageProps} src={imageProps.src} alt={imageProps.alt} />
        )}
      </AvatarImage>
      {fallback && <AvatarFallback>MI</AvatarFallback>}
    </AvatarMain>
  );
}
