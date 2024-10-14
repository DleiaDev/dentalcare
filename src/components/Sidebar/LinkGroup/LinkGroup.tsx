import React from "react";
import Link from "../Link/Link";
import styles from "./LinkGroup.module.scss";

type Props = {
  title?: string | false;
  links: React.ComponentProps<typeof Link>[];
  className?: string;
};

export default function LinkGroup({ title, links, className }: Props) {
  return (
    <div className={className}>
      {title && <span className={styles["link-group__title"]}>{title}</span>}
      <ul>
        <li>
          {links.map((link, index) => (
            <Link key={link.svg.name} {...link} className="my-2" />
          ))}
        </li>
      </ul>
    </div>
  );
}
