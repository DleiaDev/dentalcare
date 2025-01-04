"use client";

import React, { ComponentProps, useState } from "react";
import { usePathname } from "next/navigation";
import NextLink, { LinkProps } from "next/link";
import Svg from "@/components/Svg";
import { cn } from "@/lib/utils";

type Props = LinkProps & {
  title?: string | false;
  svg: ComponentProps<typeof Svg>;
  className?: string;
};

export default function Link(props: Props) {
  const [hover, setHover] = useState(false);

  const { svg: svgProps, title, ...linkProps } = props;

  const pathname = usePathname();
  const isActive = pathname.startsWith(linkProps.href.toString());

  const svgType = hover || isActive ? "colored" : svgProps.type;

  return (
    <NextLink
      {...linkProps}
      className={cn(
        "flex items-center gap-2 no-underline text-gray-800 font-semibold py-2.5 px-4 rounded-xl transition-colors duration-200 hover:text-primary hover:bg-accent",
        linkProps.className,
        isActive && "text-primary bg-accent",
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Svg className="w-8 h-8" {...svgProps} type={svgType} />
      {title && <span className="text-lg whitespace-nowrap">{title}</span>}
    </NextLink>
  );
}
