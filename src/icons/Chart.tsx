import { forwardRef } from "react";
import { SvgComponentProps as Props } from "@/components/Svg";

const colorMap = {
  colored: {
    charts: ["#5988FD", "#415BE7"],
    background: ["#AFD4FF", "#6E9FFF"],
  },
  gray: {
    charts: ["#A4ACC0", "#737E95"],
    background: ["#E4E7EE", "#C7CCDC"],
  },
  flat: {
    charts: ["#A4ACC0", "#737E95"],
    background: ["#E4E7EE", "#C7CCDC"],
  },
};

const ChartIcon = forwardRef<SVGElement, Props>(
  ({ type, id, ...svgProps }, ref) => {
    return (
      <svg
        {...svgProps}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3Z"
          fill={`url(#background-${id})`}
        />
        <path d="M7 17H9V10H7V17Z" fill={`url(#charts-${id})`} />
        <path d="M11 17H13V7H11V17Z" fill={`url(#charts-${id})`} />
        <path d="M15 17H17V13H15V17Z" fill={`url(#charts-${id})`} />
        <defs>
          <linearGradient
            id={`charts-${id}`}
            x1="12"
            y1="3"
            x2="12"
            y2="21"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].charts[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].charts[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
          <linearGradient
            id={`background-${id}`}
            x1="12"
            y1="7"
            x2="12"
            y2="17"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].background[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].background[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);

ChartIcon.displayName = "ChartIcon";

export default ChartIcon;
