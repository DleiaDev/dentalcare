import React from "react";
import Link from "../Link/Link";

type Props = {
  title?: string | false;
  links: React.ComponentProps<typeof Link>[];
  className?: string;
};

export default function LinkGroup({ title, links, className }: Props) {
  return (
    <div className={className}>
      {title && (
        <div className="text-sm pl-4 text-gray-600 font-bold mb-2">{title}</div>
      )}
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
