import { forwardRef } from "react";
import { SvgComponentProps as Props } from "@/components/Svg";

const colorMap = {
  colored: {
    dark: ["#AFD4FF", "#6E9FFF"],
    light: ["#5988FD", "#415BE7"],
  },
  gray: {
    dark: ["#E3E6EF", "#BFC6D6"],
    light: ["#A5ACC0", "#848DA3"],
  },
  flat: {
    dark: ["#E3E6EF", "#BFC6D6"],
    light: ["#A5ACC0", "#848DA3"],
  },
};

const BottleIcon = forwardRef<SVGElement, Props>(
  ({ type, id, ...svgProps }, ref) => {
    return (
      <svg
        {...svgProps}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.371 10.745L16 8.99698H8.00003L3.62905 10.745C3.44333 10.8192 3.28407 10.9473 3.17195 11.1129C3.05982 11.2786 2.99993 11.474 3 11.674V20.997C3 21.2622 3.10531 21.5165 3.29285 21.7041C3.48038 21.8916 3.73478 21.997 4 21.997L20 21.997C20.2652 21.997 20.5196 21.8916 20.7072 21.7041C20.8947 21.5166 21 21.2622 21 20.997L21 11.674C21 11.474 20.9401 11.2786 20.828 11.1129C20.7159 10.9473 20.5567 10.8192 20.371 10.745Z"
          fill={`url(#light-${id})`}
        />
        <path
          d="M7 4C7 3.44772 7.44772 3 8 3H16C16.5523 3 17 3.44772 17 4V7C17 7.55228 16.5523 8 16 8H8C7.44772 8 7 7.55228 7 7V4Z"
          fill={`url(#dark-${id})`}
        />
        <path d="M3 14H21V17H3V14Z" fill={`url(#dark-${id})`} />
        <defs>
          <linearGradient
            id={`light-${id}`}
            x1="12"
            y1="8.99698"
            x2="12"
            y2="21.997"
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
            id={`dark-${id}`}
            x1="12"
            y1="3"
            x2="12"
            y2="17"
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

BottleIcon.displayName = "BottleIcon";

export default BottleIcon;
