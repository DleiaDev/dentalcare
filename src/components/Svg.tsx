import {
  ComponentType,
  forwardRef,
  lazy,
  LazyExoticComponent,
  SVGProps,
  useId,
} from "react";

// Svg component props
export type SvgComponentProps = {
  type: "colored" | "gray" | "flat";
  id: ReturnType<typeof useId>;
} & SVGProps<SVGElement>;

type LazyComponent = LazyExoticComponent<ComponentType<SvgComponentProps>>;

// Map
const svgMap: Record<string, LazyComponent> = {
  dashboard: lazy(() => import("@/icons/Dashboard")),
  "calendar-check": lazy(() => import("@/icons/CalendarCheck")),
  user: lazy(() => import("@/icons/User")),
  stethoscope: lazy(() => import("@/icons/Stethoscope")),
  users: lazy(() => import("@/icons/Users")),
  money: lazy(() => import("@/icons/Money")),
  chart: lazy(() => import("@/icons/Chart")),
  invoice: lazy(() => import("@/icons/Invoice")),
  "credit-card": lazy(() => import("@/icons/CreditCard")),
  bottle: lazy(() => import("@/icons/Bottle")),
  "hospital-bed": lazy(() => import("@/icons/HospitalBed")),
  "doughnut-chart": lazy(() => import("@/icons/DoughnutChart")),
  "customer-support": lazy(() => import("@/icons/CustomerSupport")),
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
