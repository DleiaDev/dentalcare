"use client";

import { usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";

const pageNameMap = {
  "/dashboard": "Dashboard",
  "/reservations": "Reservations",
} as const;

type PagePath = keyof typeof pageNameMap;

export default function Navbar() {
  const pathname = usePathname();
  if (!(pathname in pageNameMap)) return null;
  const pagePath = pathname as PagePath;
  const pageName = pageNameMap[pagePath];

  return (
    <div className={styles["navbar"]}>
      <h2 className={styles["navbar__page-name"]}>{pageName}</h2>

      <div className={styles["navbar__right"]}>Right content</div>
    </div>
  );
}
