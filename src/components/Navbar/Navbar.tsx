"use client";

import { usePathname } from "next/navigation";
import Search from "./Search/Search";
import Separator from "@/components/ui/separator";
import Dropdown from "@/components/Dropdown";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import ProfileCard from "@/components/ProfileCard";

const pageNameMap = {
  "/dashboard": "Dashboard",
  "/reservations": "Reservations",
  "/staff": "Staff",
} as const;

type PagePath = keyof typeof pageNameMap;

export default function Navbar() {
  const pathname = usePathname();
  if (!(pathname in pageNameMap)) return null;
  const pagePath = pathname as PagePath;
  const pageName = pageNameMap[pagePath];

  return (
    <div className="h-[5rem] px-8 flex justify-between items-center border-b border-b-border">
      <h2 className="text-2xl font-bold">{pageName}</h2>

      <div className="flex items-center gap-x-8">
        <Search />
        <Separator orientation="vertical" className="self-stretch h-auto" />
        <Dropdown>
          <ProfileCard
            name="Marko Ilic"
            description="Super admin"
            avatarProps={{
              imageProps: {
                width: 40,
                height: 40,
                src: "/doctor_1_400x400.avif",
                alt: "Marko Ilic",
              },
            }}
            after={
              <ChevronDownIcon
                height="24"
                width="24"
                className="text-gray-600"
              />
            }
          />
        </Dropdown>
      </div>
    </div>
  );
}
