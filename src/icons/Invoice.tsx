import { forwardRef } from "react";
import { SvgComponentProps as Props } from "@/components/Svg";

const colorMap = {
  colored: {
    text: ["#AFD4FF", "#6E9FFF"],
    background: ["#5988FD", "#415BE7"],
  },
  gray: {
    text: ["#E3E6EF", "#BFC6D6"],
    background: ["#A5ACC0", "#848DA3"],
  },
  flat: {
    text: ["#E3E6EF", "#BFC6D6"],
    background: ["#A5ACC0", "#848DA3"],
  },
};

const InvoiceIcon = forwardRef<SVGElement, Props>(
  ({ type, id, ...svgProps }, ref) => {
    return (
      <svg
        {...svgProps}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.29289 2.29291C4.10536 2.48044 4 2.7348 4 3.00001V21C4.00001 21.1913 4.05487 21.3785 4.15808 21.5396C4.26129 21.7006 4.4085 21.8286 4.58228 21.9085C4.75606 21.9884 4.94913 22.0168 5.13855 21.9903C5.32797 21.9638 5.50582 21.8835 5.651 21.759L6.68298 20.875C6.86419 20.7198 7.09492 20.6345 7.3335 20.6345C7.57208 20.6345 7.80281 20.7198 7.98401 20.875L9.01599 21.759C9.19726 21.9145 9.42819 21.9999 9.66699 21.9999C9.9058 21.9999 10.1367 21.9145 10.318 21.759L11.349 20.875C11.5303 20.7195 11.7612 20.6341 12 20.6341C12.2388 20.6341 12.4697 20.7195 12.651 20.875L13.682 21.759C13.8633 21.9145 14.0942 21.9999 14.333 21.9999C14.5718 21.9999 14.8027 21.9145 14.984 21.759L16.016 20.875C16.1972 20.7198 16.4279 20.6345 16.6665 20.6345C16.9051 20.6345 17.1358 20.7198 17.317 20.875L18.35 21.76C18.4952 21.8843 18.6731 21.9643 18.8624 21.9906C19.0518 22.0169 19.2447 21.9883 19.4183 21.9083C19.592 21.8284 19.7391 21.7003 19.8422 21.5393C19.9452 21.3783 20 21.1912 20 21L20 3.00001C20 2.7348 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2H4.99995C4.73474 2 4.48043 2.10537 4.29289 2.29291Z"
          fill={`url(#background-${id})`}
        />
        <path d="M7 4H17V6H7V4Z" fill={`url(#text-${id})`} />
        <path d="M7 9H17V11H7V9Z" fill={`url(#text-${id})`} />
        <path d="M7 14H11V16H7V14Z" fill={`url(#text-${id})`} />
        <defs>
          <linearGradient
            id={`background-${id}`}
            x1="12"
            y1="2"
            x2="12"
            y2="22.0001"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].text[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].text[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
          <linearGradient
            id={`text-${id}`}
            x1="12"
            y1="4"
            x2="12"
            y2="16"
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

InvoiceIcon.displayName = "InvoiceIcon";

export default InvoiceIcon;
