import {
  ComponentType,
  forwardRef,
  lazy,
  LazyExoticComponent,
  SVGProps,
  useId,
} from "react";
import DashboardIcon from "@/icons/Dashboard";
import CalendarCheckIcon from "@/icons/CalendarCheck";
import UserIcon from "@/icons/User";
import StethoscopeIcon from "@/icons/Stethoscope";
import UsersIcon from "@/icons/Users";
import MoneyIcon from "@/icons/Money";
import ChartIcon from "@/icons/Chart";
import InvoiceIcon from "@/icons/Invoice";
import CreditCardIcon from "@/icons/CreditCard";
import BottleIcon from "@/icons/Bottle";
import HospitalBedIcon from "@/icons/HospitalBed";
import DoughnutChartIcon from "@/icons/DoughnutChart";
import CustomerSupportIcon from "@/icons/CustomerSupport";

// Svg component props
export type SvgComponentProps = {
  type: "colored" | "gray" | "flat";
  id: ReturnType<typeof useId>;
} & SVGProps<SVGElement>;

type SvgComponent = ComponentType<SvgComponentProps>;
type LazySvgComponent = LazyExoticComponent<SvgComponent>;

// Map
const svgMap: Record<string, SvgComponent | LazySvgComponent> = {
  // Layout icons
  dashboard: DashboardIcon,
  "calendar-check": CalendarCheckIcon,
  user: UserIcon,
  stethoscope: StethoscopeIcon,
  users: UsersIcon,
  money: MoneyIcon,
  chart: ChartIcon,
  invoice: InvoiceIcon,
  "credit-card": CreditCardIcon,
  bottle: BottleIcon,
  "hospital-bed": HospitalBedIcon,
  "doughnut-chart": DoughnutChartIcon,
  "customer-support": CustomerSupportIcon,

  // Lazy icons
  // "random-icon": lazy(() => import("@/icons/RandomIcon")),
};

// Props
type Props = {
  name: keyof typeof svgMap;
  type?: SvgComponentProps["type"];
} & SVGProps<SVGElement>;

const Svg = forwardRef<SVGElement, Props>(
  ({ name, ...svgProps }: Props, ref) => {
    const id = useId();

    const SvgComponent = svgMap[name];
    if (!SvgComponent) return null;

    return (
      <SvgComponent
        {...svgProps}
        type={svgProps.type ?? "flat"}
        id={id}
        ref={ref}
      />
    );
  },
);
Svg.displayName = "Svg";

export default Svg;
