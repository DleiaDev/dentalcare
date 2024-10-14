import React, { ReactElement, ReactNode } from "react";
import Link from "../Link/Link";
import styles from "./LinkGroup.module.scss";

type Props = {
  title?: string | false;
  links: ReactElement<HTMLUListElement>;
  className?: string;
};

export default function LinkGroup({ title, links, className }: Props) {
  return (
    <div className={className}>
      {title && <span className={styles["link-group__title"]}>{title}</span>}
      {links}
    </div>
  );
}
