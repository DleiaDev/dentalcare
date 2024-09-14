import { forwardRef } from "react";
import { SvgComponentProps as Props } from "@/components/Svg";

const gradientMap = {
  colored: {
    gradient1: ["#5281FC", "#3D68F2"],
    gradient2: ["#4261E7", "#2E4AD9"],
    gradient3: ["#B2D8FF", "#61B0FF"],
    gradient4: ["#A2D0FF", "#80BFFF"],
  },
  gray: {
    gradient1: ["#A6AEC1", "#8B95AD"],
    gradient2: ["#949CB0", "#737D97"],
    gradient3: ["#E1E6EF", "#D6DAE6"],
    gradient4: ["#D8DCE7", "#C4CBDA"],
  },
  flat: {
    gradient1: ["#A6AEC1", "#8B95AD"],
    gradient2: ["#949CB0", "#737D97"],
    gradient3: ["#E1E6EF", "#D6DAE6"],
    gradient4: ["#D8DCE7", "#C4CBDA"],
  },
};

const DashboardIcon = forwardRef<SVGElement, Props>(
  ({ type, id, ...svgProps }, ref) => {
    return (
      <svg
        {...svgProps}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z"
          fill={`url(#gradient1-${id})`}
        />
        <path
          d="M10 21H4C3.45 21 3 20.55 3 20V16C3 15.45 3.45 15 4 15H10C10.55 15 11 15.45 11 16V20C11 20.55 10.55 21 10 21Z"
          fill={`url(#gradient2-${id})`}
        />
        <path
          d="M14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21Z"
          fill={`url(#gradient3-${id})`}
        />
        <path
          d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13Z"
          fill={`url(#gradient4-${id})`}
        />
        <defs>
          <linearGradient
            id={`gradient1-${id}`}
            x1="12"
            y1="3"
            x2="12"
            y2="9"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={gradientMap[type].gradient1[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={gradientMap[type].gradient1[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
          <linearGradient
            id={`gradient2-${id}`}
            x1="12"
            y1="15"
            x2="12"
            y2="21"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={gradientMap[type].gradient2[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={gradientMap[type].gradient2[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
          <linearGradient
            id={`gradient3-${id}`}
            x1="12"
            y1="3"
            x2="12"
            y2="21"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={gradientMap[type].gradient3[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={gradientMap[type].gradient3[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
          <linearGradient
            id={`gradient4-${id}`}
            x1="12"
            y1="3"
            x2="12"
            y2="21"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={gradientMap[type].gradient4[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={gradientMap[type].gradient4[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);

DashboardIcon.displayName = "DashboardIcon";

export default DashboardIcon;
