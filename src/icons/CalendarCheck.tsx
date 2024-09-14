import { forwardRef } from "react";
import { SvgComponentProps as Props } from "@/components/Svg";

const colorMap = {
  colored: {
    top: "#415BE7",
    checkmark: "#415BE7",
    gradient1: ["#CFE6FF", "#81A4FF"],
  },
  gray: {
    top: "#9DA5BA",
    checkmark: "#8A93AA",
    gradient1: ["#E1E4ED", "#CED3E0"],
  },
  flat: {
    top: "#9DA5BA",
    checkmark: "#8A93AA",
    gradient1: ["#E1E4ED", "#CED3E0"],
  },
};

const CalendarCheckIcon = forwardRef<SVGElement, Props>(
  ({ type, id, ...svgProps }, ref) => {
    return (
      <svg
        {...svgProps}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 8H3V20C3 21.103 3.897 22 5 22H19C20.103 22 21 21.103 21 20V8Z"
          fill={`url(#gradient1-${id})`}
        />
        <path
          d="M19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V8H21V6C21 4.897 20.103 4 19 4Z"
          fill={colorMap[type].top}
        />
        <path
          d="M11 17.414L16.707 11.707L15.293 10.293L11 14.586L8.707 12.293L7.293 13.707L11 17.414Z"
          fill={colorMap[type].checkmark}
        />
        <defs>
          <linearGradient
            id={`gradient1-${id}`}
            x1="12"
            y1="2"
            x2="12"
            y2="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].gradient1[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].gradient1[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);

CalendarCheckIcon.displayName = "CalendarCheckIcon";

export default CalendarCheckIcon;
