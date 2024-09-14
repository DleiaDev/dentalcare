import { forwardRef } from "react";
import { SvgComponentProps as Props } from "@/components/Svg";

const colorMap = {
  colored: {
    head: ["#A4CCFD", "#7090ED"],
    body: ["#A5B6F2", "#203FD9"],
    background: ["#E1E9FC", "#B5C0F4"],
  },
  gray: {
    head: ["#A6AEC1", "#8E97AD"],
    body: ["#939BB0", "#79839C"],
    background: ["#E2E4ED", "#D1D6E2"],
  },
  flat: {
    head: ["#A6AEC1", "#8E97AD"],
    body: ["#939BB0", "#79839C"],
    background: ["#E2E4ED", "#D1D6E2"],
  },
};

const UserIcon = forwardRef<SVGElement, Props>(
  ({ type, id, ...svgProps }, ref) => {
    return (
      <svg
        {...svgProps}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="11" fill={`url(#background-${id})`} />
        <path
          d="M12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z"
          fill={`url(#head-${id})`}
        />
        <path
          d="M12 23C15.866 23 19 21.2091 19 19C19 16.7909 15.866 15 12 15C8.13401 15 5 16.7909 5 19C5 21.2091 8.13401 23 12 23Z"
          fill={`url(#body-${id})`}
        />
        <defs>
          <linearGradient
            id={`background-${id}`}
            x1="12"
            y1="1"
            x2="12"
            y2="23"
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
            id={`head-${id}`}
            x1="12"
            y1="5"
            x2="12"
            y2="13"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].head[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].head[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
          <linearGradient
            id={`body-${id}`}
            x1="12"
            y1="15"
            x2="12"
            y2="23"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].body[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].body[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);

UserIcon.displayName = "UserIcon";

export default UserIcon;
