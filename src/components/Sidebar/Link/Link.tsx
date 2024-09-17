"use client";

import React, { ComponentProps, useState } from "react";
import { usePathname } from "next/navigation";
import NextLink, { LinkProps } from "next/link";
import styles from "./Link.module.scss";
import Svg from "@/components/Svg";
import clsx from "classnames";

type Props = LinkProps & {
  title: string;
  svg: ComponentProps<typeof Svg>;
  className?: string;
};

export default function Link(props: Props) {
  const [hover, setHover] = useState(false);

  const { svg: svgProps, title, ...linkProps } = props;

  const pathname = usePathname();
  const isActive = pathname === linkProps.href;

  const className = clsx(styles["link"], linkProps.className, {
    [styles["link--active"]]: isActive,
  });

  const svgType = hover || isActive ? "colored" : svgProps.type;

  return (
    <NextLink
      {...linkProps}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Svg className={styles["link__icon"]} {...svgProps} type={svgType} />
      <span className={styles["link__text"]}>{title}</span>
    </NextLink>
  );
}
