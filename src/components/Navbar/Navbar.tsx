"use client";

import { usePathname } from "next/navigation";
import Search from "./Search/Search";
import Separator from "@/components/ui/separator";
import Dropdown from "@/components/Dropdown";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import ProfileCard from "@/components/ProfileCard";

const pageNameMap = [
  { regex: "/dashboard", title: "Dashboard" },
  { regex: "/reservations", title: "Reservations" },
  { regex: "/staff", title: "Staff" },
  { regex: "/treatments", title: "Treatments" },
  { regex: "/stocks", title: "Stocks" },
  { regex: "/peripherals/new", title: "Peripherals" },
  { regex: "/peripherals/[a-zA-Z]+", title: "Peripherals" },
  { regex: "/peripherals", title: "Peripherals" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const pageTitle = pageNameMap.find(
    (page) => pathname.match(page.regex) !== null,
  )?.title;
  if (!pageTitle) return null;

  return (
    <div className="h-[5rem] px-8 flex justify-between items-center border-b border-b-border">
      <h2 className="text-3xl font-bold">{pageTitle}</h2>

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
