import { SvgComponentProps as Props } from "@/components/Svg";

const colorMap = {
  colored: {
    sun: "#415BE7",
    background: ["#AFD4FF", "#6E9FFF"],
    mountain1: ["#6D96FF", "#415BE7"],
    mountain2: ["#6E9FFF", "#7A8FFF"],
  },
  gray: {
    sun: "#B9BFCD",
    background: ["#F6F8FF", "#F3F6FE"],
    mountain1: ["#D7DCEB", "#C4CAD8"],
    mountain2: ["#DDE2F0", "#D6DCEA"],
  },
  flat: {
    sun: "currentColor",
    background: ["currentColor", "currentColor"],
    mountain1: ["currentColor", "currentColor"],
    mountain2: ["currentColor", "currentColor"],
  },
};

export default function Image({ type, id, ...svgProps }: Props) {
  return (
    <svg
      {...svgProps}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 3C0 1.34315 1.34315 0 3 0H21C22.6569 0 24 1.34315 24 3V21C24 22.6569 22.6569 24 21 24H3C1.34315 24 0 22.6569 0 21V3Z"
        fill={`url(#background-${id})`}
      />
      <path
        d="M9.74739 9.98808C9.06111 9.35377 8.14995 9 7.20251 9C6.25507 9 5.3439 9.35377 4.65762 9.98808L0 14.5111V20.5028C0.00316466 21.4294 0.383597 22.3171 1.05828 22.9723C1.73296 23.6275 2.64711 23.9969 3.60125 24H20.4071C20.8913 23.9997 21.3706 23.9046 21.8161 23.7203C22.2616 23.536 22.6643 23.2664 23 22.9275L9.74739 9.98808Z"
        fill={`url(#mountain1-${id})`}
      />
      <path
        d="M24 16.7203L19.2637 12.0521C18.5752 11.3782 17.6443 11 16.674 11C15.7037 11 14.7727 11.3782 14.0842 12.0521L13 13.1208L22.9695 23C23.6313 22.3321 24.0012 21.4355 24 20.5016V16.7203Z"
        fill={`url(#mountain2-${id})`}
      />
      <path
        d="M19.6667 2.50559C19.1734 2.17595 18.5933 2 18 2C17.2046 2.00083 16.442 2.31716 15.8796 2.87959C15.3172 3.44202 15.0008 4.2046 15 5C15 5.59334 15.1759 6.17336 15.5056 6.66671C15.8352 7.16006 16.3038 7.54457 16.8519 7.77164C17.4001 7.9987 18.0033 8.05811 18.5853 7.94235C19.1672 7.8266 19.7018 7.54088 20.1213 7.12132C20.5409 6.70176 20.8266 6.16721 20.9424 5.58527C21.0581 5.00333 20.9987 4.40013 20.7716 3.85195C20.5446 3.30377 20.1601 2.83524 19.6667 2.50559Z"
        fill={colorMap[type].sun}
      />
      <defs>
        <linearGradient
          id={`background-${id}`}
          x1="12"
          y1="2"
          x2="12"
          y2="22"
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
          id={`mountain1-${id}`}
          x1="11.58"
          y1="9.13239"
          x2="11.58"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor={colorMap[type].mountain1[0]}
            style={{ transition: "0.2s" }}
          />
          <stop
            offset="1"
            stopColor={colorMap[type].mountain1[1]}
            style={{ transition: "0.2s" }}
          />
        </linearGradient>
        <linearGradient
          id={`mountain2-${id}`}
          x1="17.4955"
          y1="11.1048"
          x2="17.4955"
          y2="21.076"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor={colorMap[type].mountain2[0]}
            style={{ transition: "0.2s" }}
          />
          <stop
            offset="1"
            stopColor={colorMap[type].mountain2[1]}
            style={{ transition: "0.2s" }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
}
