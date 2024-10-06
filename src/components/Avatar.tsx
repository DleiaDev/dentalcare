import Image, { ImageProps } from "next/image";
import { Avatar as AvatarMain, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

export type Props = {
  className?: string;
  imageProps: Omit<ImageProps, "src"> & {
    src?: string;
  };
};

export default function Avatar({ className, imageProps }: Props) {
  return (
    <AvatarMain className={cn(className)}>
      <AvatarImage asChild src={imageProps.src}>
        {imageProps.src && (
          <Image {...imageProps} src={imageProps.src} alt={imageProps.alt} />
        )}
      </AvatarImage>
      <AvatarFallback>MI</AvatarFallback>
    </AvatarMain>
  );
}
