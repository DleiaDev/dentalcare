import { forwardRef } from "react";
import { SvgComponentProps as Props } from "@/components/Svg";

const colorMap = {
  colored: {
    bill1: ["#ADCFFE", "#679AFF"],
    bill2: ["#6D96FF", "#415BE7"],
  },
  gray: {
    bill1: ["#D1DCF2", "#C3CAD9"],
    bill2: ["#A7AFC1", "#7B839D"],
  },
  flat: {
    bill1: ["#D1DCF2", "#C3CAD9"],
    bill2: ["#A7AFC1", "#7B839D"],
  },
};

const MoneyIcon = forwardRef<SVGElement, Props>(
  ({ type, id, ...svgProps }, ref) => {
    return (
      <svg
        {...svgProps}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="7" width="20" height="12" fill={`url(#bill1-${id})`} />
        <rect x="1" y="4" width="20" height="12" fill={`url(#bill2-${id})`} />
        <circle cx="11" cy="10" r="3" fill="white" />
        <defs>
          <linearGradient
            id={`bill1-${id}`}
            x1="13"
            y1="7"
            x2="13"
            y2="19"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].bill1[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].bill1[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
          <linearGradient
            id={`bill2-${id}`}
            x1="11"
            y1="4"
            x2="11"
            y2="16"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].bill2[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].bill2[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);

MoneyIcon.displayName = "MoneyIcon";

export default MoneyIcon;
