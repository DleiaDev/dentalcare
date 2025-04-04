"use client";

import LinkGroup from "./LinkGroup/LinkGroup";
import HospitalIcon from "@/icons/hospital.svg";
import LogoSvg from "@/icons/logo.svg";
import { cn } from "@/lib/utils";
import Button from "../Button";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Separator from "@/components/ui/separator";

type Props = {
  className?: string;
};

export default function Sidebar({ className }: Props) {
  const [collapsed, setCollapsed] = useState(true);

  const pathname = usePathname();
  useEffect(() => {
    setCollapsed(true);
  }, [pathname]);

  // TODO: aria-hidden="true" to all immediate children of <body> when overlay is present

  return (
    <>
      <div className="min-w-[97px] xl:hidden"></div>
      <div
        className={cn(
          "fixed z-40 inset-0 w-screen h-svh bg-black opacity-40 xl:hidden",
          collapsed && "hidden",
        )}
        onClick={() => setCollapsed(true)}
      ></div>
      <div
        className={cn(
          "border-e border-solid border-gray-400 bg-gray-200 max-w-80 absolute z-50 left-0 top-0 xl:relative",
          className,
          !collapsed && "w-4/5",
        )}
      >
        <Button
          color="white"
          className="border border-border w-9 h-9 p-0 rounded-full absolute top-5 -right-4"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5" />
          )}
        </Button>

        <nav className="h-svh overflow-auto flex flex-col">
          <div className="p-4">
            {/* Logo */}
            <div className="flex gap-3 items-center px-4 h-16">
              <LogoSvg className="w-8 h-8" />
              {!collapsed && (
                <h1 className="my-0 font-black text-2xl">Dentalcare</h1>
              )}
            </div>

            {/* CurrentClinic */}
            <div className="mb-7 flex items-center gap-3 border border-border rounded-xl py-2 px-4">
              <HospitalIcon />
              {!collapsed && (
                <div className="flex flex-col justify-between gap-1">
                  <h5 className="my-0 text-gray-800">Avicena Clinic</h5>
                  <p className="my-0 font-medium text-gray-700 text-xs">
                    845 Euclid Avenue, CA
                  </p>
                </div>
              )}
            </div>

            <LinkGroup
              className="mb-6"
              links={[
                {
                  title: !collapsed && "Dashboard",
                  href: "/dashboard",
                  svg: { name: "dashboard" },
                },
              ]}
            />

            <LinkGroup
              className="mb-6"
              title={!collapsed && "CLINIC"}
              links={[
                {
                  title: !collapsed && "Reservartions",
                  href: "/reservations",
                  svg: {
                    type: "gray",
                    name: "calendar-check",
                  },
                },
                {
                  title: !collapsed && "Patients",
                  href: "/patients",
                  svg: { type: "gray", name: "user" },
                },
                {
                  title: !collapsed && "Treatments",
                  href: "/treatments",
                  svg: { name: "stethoscope", type: "gray" },
                },
                {
                  title: !collapsed && "Staff",
                  href: "/staff",
                  svg: { name: "users" },
                },
              ]}
            />

            <LinkGroup
              className="mb-6"
              title={!collapsed && "FINANCE"}
              links={[
                {
                  title: !collapsed && "Accounts",
                  href: "/accounts",
                  svg: { name: "money" },
                },
                {
                  title: !collapsed && "Sales",
                  href: "/sales",
                  svg: { name: "chart" },
                },
                {
                  title: !collapsed && "Purchases",
                  href: "/purchases",
                  svg: { name: "invoice" },
                },
                {
                  title: !collapsed && "Payment Methods",
                  href: "/payment-methods",
                  svg: { name: "credit-card" },
                },
              ]}
            />

            <LinkGroup
              className="mb-2"
              title={!collapsed && "PHYSICAL ASSETS"}
              links={[
                {
                  title: !collapsed && "Stock",
                  href: "/stocks",
                  svg: { name: "bottle" },
                },
                {
                  title: !collapsed && "Peripherals",
                  href: "/peripherals",
                  svg: { name: "hospital-bed", type: "gray" },
                },
              ]}
            />
          </div>

          <Separator />

          <div className="p-4">
            <LinkGroup
              links={[
                {
                  title: !collapsed && "Reports",
                  href: "/report",
                  svg: { name: "doughnut-chart" },
                },
                {
                  title: !collapsed && "Customer Support",
                  href: "/customer-support",
                  svg: { name: "customer-support" },
                },
              ]}
            />
          </div>
        </nav>
      </div>
    </>
  );
}
