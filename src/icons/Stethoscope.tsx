import { forwardRef } from "react";
import { SvgComponentProps as Props } from "@/components/Svg";

const colorMap = {
  colored: {
    tubing: ["#5A87FC", "#1938D9"],
    earFrame: ["#A4CDFF", "#5B8BF9"],
  },
  gray: {
    tubing: ["#C4CDE8", "#717E9E"],
    earFrame: ["#E3E5EF", "#CBD2DE"],
  },
  flat: {
    tubing: ["currentColor", "currentColor"],
    earFrame: ["currentColor", "currentColor"],
  },
};

const Stethoscope = forwardRef<SVGElement, Props>(
  ({ type, id, ...svgProps }, ref) => {
    return (
      <svg
        {...svgProps}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.7594 13.2406C4.88422 14.3654 6.40926 14.9982 7.99999 15C9.59072 14.9982 11.1158 14.3654 12.2406 13.2406C13.3654 12.1158 13.9981 10.5907 14 9L14 3.00001C14 2.7348 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2H11C10.7347 2 10.4804 2.10537 10.2929 2.29291C10.1054 2.48044 10 2.73478 10 3C10 3.26522 10.1053 3.51956 10.2928 3.70709C10.4804 3.89463 10.7348 4 11 4H12L11.9999 9C11.9999 10.0609 11.5786 11.0783 10.8284 11.8284C10.0783 12.5786 9.06092 13 8.00006 13C6.93919 13 5.92172 12.5786 5.17157 11.8284C4.42143 11.0783 4 10.0609 4 9V4L5 3.99999C5.26522 3.99999 5.51962 3.89464 5.70715 3.70711C5.89469 3.51957 6.00005 3.26523 6.00005 3.00001C6.00005 2.7348 5.89464 2.48043 5.70711 2.29289C5.51957 2.10536 5.26522 2 5 2H2.99995C2.73474 2 2.48043 2.10537 2.29289 2.29291C2.10536 2.48044 2 2.73478 2 3V9C2.00185 10.5907 2.63458 12.1158 3.7594 13.2406Z"
          fill={`url(#earframe-${id})`}
        />
        <path
          d="M17.3332 13.4944C17.8266 13.8241 18.4066 14 19 14C19.7954 13.9992 20.558 13.6829 21.1205 13.1204C21.6829 12.558 21.9992 11.7954 22 11C22 10.4066 21.8241 9.82664 21.4944 9.33329C21.1648 8.83994 20.6962 8.45542 20.148 8.22836C19.5998 8.0013 18.9966 7.94189 18.4147 8.05765C17.8328 8.1734 17.2982 8.45913 16.8786 8.87869C16.4591 9.29825 16.1734 9.83279 16.0576 10.4147C15.9419 10.9967 16.0013 11.5999 16.2284 12.148C16.4554 12.6962 16.8399 13.1648 17.3332 13.4944Z"
          fill={`url(#tubing-${id})`}
        />
        <path
          d="M19 14C18.6586 13.996 18.3204 13.9338 18 13.816V15.5C18 16.6935 17.5259 17.8381 16.682 18.682C15.8381 19.5259 14.6935 20 13.5 20C12.3065 20 11.1619 19.5259 10.318 18.682C9.47411 17.8381 9 16.6935 9 15.5V14.91C8.33873 15.03 7.66127 15.03 7 14.91V15.5C7 17.2239 7.68482 18.8772 8.90381 20.0962C10.1228 21.3152 11.7761 22 13.5 22C15.2239 22 16.8772 21.3152 18.0962 20.0962C19.3152 18.8772 20 17.2239 20 15.5V13.816C19.6796 13.9338 19.3413 13.996 19 14Z"
          fill={`url(#tubing-${id})`}
        />
        <defs>
          <linearGradient
            id={`earframe-${id}`}
            x1="8.00002"
            y1="2"
            x2="8.00002"
            y2="15"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].earFrame[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].earFrame[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
          <linearGradient
            id={`tubing-${id}`}
            x1="14.5"
            y1="8"
            x2="14.5"
            y2="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].tubing[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].tubing[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);

Stethoscope.displayName = "Stethoscope";

export default Stethoscope;
