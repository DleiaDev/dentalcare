"use client";

import { usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";
import Search from "./Search/Search";
import Separator from "@/components/ui/separator";
import Avatar from "@/components/Avatar";
import Dropdown from "@/components/Dropdown";
import { ChevronDownIcon } from "@radix-ui/react-icons";

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

      <div className="flex items-center gap-x-8">
        <Search />
        <Separator orientation="vertical" className="self-stretch h-auto" />
        <Dropdown>
          <div className="flex items-center cursor-pointer">
            <Avatar className="me-4" />
            <div className="flex flex-col me-6">
              <div className="font-semibold whitespace-nowrap">Marko Ilic</div>
              <div className="font-medium whitespace-nowrap text-sm text-gray-600">
                Super admin
              </div>
            </div>
            <ChevronDownIcon height="24" width="24" className="text-gray-600" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
