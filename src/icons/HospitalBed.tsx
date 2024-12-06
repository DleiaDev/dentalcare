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
    dark: ["currentColor", "currentColor"],
    light: ["currentColor", "currentColor"],
  },
};

const HospitalBed = forwardRef<SVGElement, Props>(
  ({ type, id, ...svgProps }, ref) => {
    return (
      <svg
        {...svgProps}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.08691 11.2174C2.08691 11.6496 2.43731 12 2.86952 12H7.82604V15.1304H2.86952C2.43731 15.1304 2.08691 15.4808 2.08691 15.913C2.08691 16.3453 2.43731 16.6957 2.86952 16.6957H3.52893H5.86229H18.1376H20.471H21.1304C21.5626 16.6957 21.913 16.3453 21.913 15.913C21.913 15.4808 21.5626 15.1304 21.1304 15.1304H16.1739V12H21.1304C21.5626 12 21.913 11.6496 21.913 11.2174V10.4348H2.08691V11.2174ZM9.39126 15.1304H14.6087V12H9.39126V15.1304Z"
          fill={`url(#light-${id})`}
        />
        <path
          d="M3.13039 17.7391C3.13039 18.6036 3.83114 19.3043 4.69561 19.3043C5.56008 19.3043 6.26083 18.6036 6.26083 17.7391C6.26083 17.3382 6.11013 16.9726 5.86229 16.6957H3.52893C3.28109 16.9726 3.13039 17.3382 3.13039 17.7391Z"
          fill={`url(#light-${id})`}
        />
        <path
          d="M17.7391 17.7391C17.7391 18.6036 18.4398 19.3043 19.3043 19.3043C20.1688 19.3043 20.8695 18.6036 20.8695 17.7391C20.8695 17.3382 20.7188 16.9726 20.471 16.6957H18.1376C18.1236 16.7113 18.1099 16.7273 18.0965 16.7435C17.8732 17.0141 17.7391 17.3609 17.7391 17.7391Z"
          fill={`url(#light-${id})`}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.4348 10.4348C23.2993 10.4348 24 9.73398 24 8.86956C24 8.00514 23.2993 7.30434 22.4348 7.30434H12H8.99243L1.44663 7.3093C0.637617 7.36993 0 8.04506 0 8.86956C0 9.73398 0.700748 10.4348 1.56522 10.4348H12H22.4348Z"
          fill={`url(#dark-${id})`}
        />
        <path
          d="M1.04348 6.26087C1.04348 6.66417 1.19609 7.03173 1.44663 7.3093L8.99243 7.30434C9.24036 7.0274 9.3913 6.66182 9.3913 6.26087C9.3913 5.39645 8.6905 4.69565 7.82609 4.69565H2.6087C1.74423 4.69565 1.04348 5.39645 1.04348 6.26087Z"
          fill={`url(#dark-${id})`}
        />
        <defs>
          <linearGradient
            id={`light-${id}`}
            x1="12"
            y1="10.4348"
            x2="12"
            y2="16.6957"
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
          <linearGradient
            id={`dark-${id}`}
            x1="12"
            y1="4.69565"
            x2="12"
            y2="10.4348"
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
          <clipPath id="clip0_48_414">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);

HospitalBed.displayName = "HospitalBed";

export default HospitalBed;
