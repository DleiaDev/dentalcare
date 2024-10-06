import Logo from "./Logo/Logo";
import CurrentClinic from "./CurrentClinic/CurrentClinic";
import Link from "./Link/Link";
import LinkGroup from "./LinkGroup/LinkGroup";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  return (
    <div className="h-svh overflow-auto flex flex-col border-e border-solid border-gray-400 bg-gray-200">
      <div className={styles["sidebar__container"]}>
        {/* Logo */}
        <Logo />

        {/* CurrentClinic */}
        <CurrentClinic className={styles["sidebar__current-clinic"]} />

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
        <Link title="Report" href="/report" svg={{ name: "doughnut-chart" }} />

        {/* Customer support */}
        <Link
          title="Customer Support"
          href="/customer-support"
          svg={{ name: "customer-support" }}
        />
      </div>
    </div>
  );
}
