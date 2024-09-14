import { forwardRef } from "react";
import { SvgComponentProps as Props } from "@/components/Svg";

const colorMap = {
  colored: {
    dark: ["#5988FD", "#415BE7"],
    light: ["#AFD4FF", "#6E9FFF"],
  },
  gray: {
    dark: ["#A5ACC0", "#848DA3"],
    light: ["#E3E6EF", "#BFC6D6"],
  },
  flat: {
    dark: ["#A5ACC0", "#848DA3"],
    light: ["#E3E6EF", "#BFC6D6"],
  },
};

const DoughnutChartIcon = forwardRef<SVGElement, Props>(
  ({ type, id, ...svgProps }, ref) => {
    return (
      <svg
        {...svgProps}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 6C15.507 6.423 17.577 8.493 18 11H22C21.529 6.283 17.717 2.471 13 2V6Z"
          fill={`url(#dark-${id})`}
        />
        <path
          d="M18 13C17.522 15.833 15.018 17.949 12.051 17.949C8.74203 17.949 6.05103 15.258 6.05103 11.949C6.05103 8.982 8.16702 6.478 11 6V2C5.95402 2.504 2.05103 6.773 2.05103 11.949C2.05103 17.463 6.53703 21.949 12.051 21.949C17.227 21.949 21.496 18.046 22 13H18Z"
          fill={`url(#light-${id})`}
        />
        <defs>
          <linearGradient
            id={`dark-${id}`}
            x1="17.5"
            y1="2"
            x2="17.5"
            y2="11"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].dark[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].dark[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
          <linearGradient
            id={`light-${id}`}
            x1="12.0255"
            y1="2"
            x2="12.0255"
            y2="21.949"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].light[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].light[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);

DoughnutChartIcon.displayName = "DoughnutChartIcon";

export default DoughnutChartIcon;
