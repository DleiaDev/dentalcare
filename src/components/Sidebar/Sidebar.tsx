"use client";

import Link from "./Link/Link";
import LinkGroup from "./LinkGroup/LinkGroup";
import styles from "./Sidebar.module.scss";
import HospitalIcon from "@/icons/hospital.svg";
import LogoSvg from "@/icons/logo.svg";
import { cn } from "@/lib/utils";
import Button from "../Button";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

export default function Sidebar({ className }: Props) {
  const [collapsed, setCollapsed] = useState(true);

  const pathname = usePathname();
  useEffect(() => {
    setCollapsed(true);
  }, [pathname]);

  return (
    <>
      <div className="min-w-[97px] xl:hidden"></div>
      <div
        className={cn(
          "absolute w-screen h-svh bg-black opacity-40 z-10 xl:hidden",
          collapsed && "hidden",
        )}
        onClick={() => setCollapsed(true)}
      ></div>
      <div
        className={cn(
          "border-e border-solid border-gray-400 bg-gray-200 max-w-80 absolute left-0 top-0 z-10 xl:relative",
          className,
          !collapsed && "w-4/5",
        )}
      >
        <Button
          variant="ghost"
          className="bg-white border border-border text-gray-700 w-9 h-9 p-0 rounded-full absolute top-5 -right-4 shadow"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5" />
          )}
        </Button>

        <nav className="h-svh overflow-auto flex flex-col">
          <div className={styles["sidebar__container"]}>
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

            <ul>
              <li>
                <Link
                  className={styles["sidebar__dashboard-link"]}
                  title={!collapsed && "Dashboard"}
                  href="/dashboard"
                  svg={{ name: "dashboard" }}
                />
              </li>
            </ul>

            {/* Clinic group */}
            <LinkGroup
              className={styles["sidebar__link-group"]}
              title={!collapsed && "CLINIC"}
              links={
                <ul>
                  <li>
                    <Link
                      title={!collapsed && "Reservations"}
                      href="/reservations"
                      svg={{
                        type: "gray",
                        name: "calendar-check",
                      }}
                    />
                  </li>
                  <li>
                    <Link
                      title={!collapsed && "Patients"}
                      href="/patients"
                      svg={{ name: "user" }}
                    />
                  </li>
                  <li>
                    <Link
                      title={!collapsed && "Treatments"}
                      href="/treatments"
                      svg={{ name: "stethoscope" }}
                    />
                  </li>
                  <li>
                    <Link
                      title={!collapsed && "Staff"}
                      href="/staff"
                      svg={{ name: "users" }}
                    />
                  </li>
                </ul>
              }
            />

            {/* Finance group */}
            <LinkGroup
              className={styles["sidebar__link-group"]}
              title={!collapsed && "FINANCE"}
              links={
                <ul>
                  <li>
                    <Link
                      title={!collapsed && "Accounts"}
                      href="/accounts"
                      svg={{ name: "money" }}
                    />
                  </li>
                  <li>
                    <Link
                      title={!collapsed && "Sales"}
                      href="/sales"
                      svg={{ name: "chart" }}
                    />
                  </li>
                  <li>
                    <Link
                      title={!collapsed && "Purchases"}
                      href="/purchases"
                      svg={{ name: "invoice" }}
                    />
                  </li>
                  <li>
                    <Link
                      title={!collapsed && "Payment methods"}
                      href="/payment-methods"
                      svg={{ name: "credit-card" }}
                    />
                  </li>
                </ul>
              }
            />

            {/* Physical assets */}
            <LinkGroup
              className={`${styles["sidebar__link-group"]} ${styles["sidebar__link-group--physical"]}`}
              title={!collapsed && "PHYSICAL ASSETS"}
              links={
                <ul>
                  <li>
                    <Link
                      title={!collapsed && "Stock"}
                      href="/stock"
                      svg={{ name: "bottle" }}
                    />
                  </li>
                  <li>
                    <Link
                      title={!collapsed && "Peripherals"}
                      href="/peripherals"
                      svg={{ name: "hospital-bed" }}
                    />
                  </li>
                </ul>
              }
            />
          </div>

          {/* Divider */}
          <div className={styles["sidebar__link-divider"]}></div>

          <div className={styles["sidebar__container"]}>
            <ul>
              <li>
                <Link
                  title={!collapsed && "Report"}
                  href="/report"
                  svg={{ name: "doughnut-chart" }}
                />
              </li>
              <li>
                <Link
                  title={!collapsed && "Customer Support"}
                  href="/customer-support"
                  svg={{ name: "customer-support" }}
                />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
