import React from "react";
import Link from "../Link/Link";
import styles from "./LinkGroup.module.scss";

type Props = {
  title: string;
  links: React.ComponentProps<typeof Link>[];
  className?: string;
};

export default function LinkGroup({ title, links, className }: Props) {
  return (
    <div className={className}>
      <span className={styles["link-group__title"]}>{title}</span>
      {links.map((link, index) => (
        <Link key={link.title} {...link} />
      ))}
    </div>
  );
}
