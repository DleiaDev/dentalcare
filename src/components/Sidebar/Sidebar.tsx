import Logo from "./Logo/Logo";
import Link from "./Link/Link";
import LinkGroup from "./LinkGroup/LinkGroup";
import styles from "./Sidebar.module.scss";
import HospitalIcon from "@/icons/hospital.svg";
import { cn } from "@/lib/utils";
import Button from "../Button";
import { ChevronRightIcon } from "@radix-ui/react-icons";

type Props = {
  className?: string;
};

export default function Sidebar({ className }: Props) {
  return (
    <div
      className={cn(
        "border-e border-solid border-gray-400 bg-gray-200 relative",
        className,
      )}
    >
      <Button
        variant="ghost"
        className="bg-white border border-border text-gray-700 w-9 h-9 p-0 rounded-full absolute top-5 -right-4 shadow"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </Button>

      <div className="h-svh overflow-auto flex flex-col">
        <div className={styles["sidebar__container"]}>
          {/* Logo */}
          <Logo />

          {/* CurrentClinic */}
          <div className="mb-7 flex items-center gap-3 border border-border rounded-xl py-2 px-4">
            <HospitalIcon />
            <div className="flex flex-col justify-between gap-1">
              <h5 className="my-0 text-gray-800">Avicena Clinic</h5>
              <p className="my-0 font-medium text-gray-700 text-xs">
                845 Euclid Avenue, CA
              </p>
            </div>
          </div>

          {/* Dashboard */}
          <Link
            className={styles["sidebar__dashboard-link"]}
            title="Dashboard"
            href="/dashboard"
            svg={{ name: "dashboard" }}
          />

          {/* Clinic group */}
          <LinkGroup
            className={styles["sidebar__link-group"]}
            title="CLINIC"
            links={[
              {
                title: "Reservations",
                href: "/reservations",
                svg: {
                  type: "gray",
                  name: "calendar-check",
                },
              },
              {
                title: "Patients",
                href: "/patients",
                svg: {
                  name: "user",
                },
              },
              {
                title: "Treatments",
                href: "/treatments",
                svg: {
                  name: "stethoscope",
                },
              },
              {
                title: "Staff",
                href: "/staff",
                svg: {
                  name: "users",
                },
              },
            ]}
          />

          {/* Finance group */}
          <LinkGroup
            className={styles["sidebar__link-group"]}
            title="FINANCE"
            links={[
              {
                title: "Accounts",
                href: "/accounts",
                svg: {
                  name: "money",
                },
              },
              {
                title: "Sales",
                href: "/sales",
                svg: {
                  name: "chart",
                },
              },
              {
                title: "Purchases",
                href: "/purchases",
                svg: {
                  name: "invoice",
                },
              },
              {
                title: "Payment methods",
                href: "/payment-methods",
                svg: {
                  name: "credit-card",
                },
              },
            ]}
          />

          {/* Physical assets */}
          <LinkGroup
            className={`${styles["sidebar__link-group"]} ${styles["sidebar__link-group--physical"]}`}
            title="PHYSICAL ASSETS"
            links={[
              {
                title: "Stock",
                href: "/stock",
                svg: {
                  name: "bottle",
                },
              },
              {
                title: "Peripherals",
                href: "/peripherals",
                svg: {
                  name: "hospital-bed",
                },
              },
            ]}
          />
        </div>

        {/* Divider */}
        <div className={styles["sidebar__link-divider"]}></div>

        <div className={styles["sidebar__container"]}>
          {/* Report */}
          <Link
            title="Report"
            href="/report"
            svg={{ name: "doughnut-chart" }}
          />

          {/* Customer support */}
          <Link
            title="Customer Support"
            href="/customer-support"
            svg={{ name: "customer-support" }}
          />
        </div>
      </div>
    </div>
  );
}
