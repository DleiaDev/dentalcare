import { forwardRef } from "react";
import { SvgComponentProps as Props } from "@/components/Svg";

const colorMap = {
  colored: {
    content: ["#AFD4FF", "#6E9FFF"],
    background: ["#5988FD", "#415BE7"],
  },
  gray: {
    content: ["#E3E6EF", "#BFC6D6"],
    background: ["#A5ACC0", "#848DA3"],
  },
  flat: {
    content: ["#E3E6EF", "#BFC6D6"],
    background: ["#A5ACC0", "#848DA3"],
  },
};

const CreditCardIcon = forwardRef<SVGElement, Props>(
  ({ type, id, ...svgProps }, ref) => {
    return (
      <svg
        {...svgProps}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.69038 4.66947C2.13243 4.24082 2.73198 4 3.35713 4H20.6429C21.268 4 21.8676 4.2408 22.3096 4.66946C22.7517 5.09811 23 5.6795 23 6.28571V7.7181L1 7.71809V6.2857C1 5.67949 1.24833 5.09812 1.69038 4.66947Z"
          fill={`url(#content-${id})`}
        />
        <path
          d="M1 9.62286V17.7143C1 18.3205 1.24833 18.9019 1.69038 19.3305C2.13243 19.7592 2.73199 20 3.35714 20L20.6429 20C21.268 20 21.8676 19.7592 22.3096 19.3305C22.7517 18.9019 23 18.3205 23 17.7143V9.62286H1Z"
          fill={`url(#content-${id})`}
        />
        <path
          d="M1 7.70001H23V9.70001H1V7.70001Z"
          fill={`url(#background-${id})`}
        />
        <path
          d="M13.5 16C13.5 15.4477 13.9477 15 14.5 15H18.5C19.0523 15 19.5 15.4477 19.5 16C19.5 16.5523 19.0523 17 18.5 17H14.5C13.9477 17 13.5 16.5523 13.5 16Z"
          fill={`url(#background-${id})`}
        />
        <defs>
          <linearGradient
            id={`background-${id}`}
            x1="12"
            y1="4"
            x2="12"
            y2="20"
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
          <linearGradient
            id={`content-${id}`}
            x1="12"
            y1="7.70001"
            x2="12"
            y2="18"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].content[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].content[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);

CreditCardIcon.displayName = "CreditCardIcon";

export default CreditCardIcon;
