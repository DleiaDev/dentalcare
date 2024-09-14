import { forwardRef } from "react";
import { SvgComponentProps as Props } from "@/components/Svg";

const colorMap = {
  colored: {
    eye: "#415BE7",
    neck: "#415BE7",
    headband: "#5E72DF",
    microphone: "#5068E8",
    earphoneInner: "#759FF3",
    face: ["#AFD4FF", "#6E9FFF"],
    hair: ["#7FBAFF", "#3575F2"],
    earphoneOuter: ["#4F7AE5", "#2E40A0"],
  },
  gray: {
    eye: "#848DA3",
    neck: "#848DA3",
    headband: "#9097A7",
    microphone: "#666D7F",
    earphoneInner: "#BFC6D6",
    face: ["#E3E6EF", "#BFC6D6"],
    hair: ["#CFD1D6", "#767E91"],
    earphoneOuter: ["#8F98AE", "#737B90"],
  },
  flat: {
    eye: "#848DA3",
    neck: "#848DA3",
    headband: "#9097A7",
    microphone: "#666D7F",
    earphoneInner: "#BFC6D6",
    face: ["#E3E6EF", "#BFC6D6"],
    hair: ["#CFD1D6", "#767E91"],
    earphoneOuter: ["#8F98AE", "#737B90"],
  },
};

const CustomerSupportIcon = forwardRef<SVGElement, Props>(
  ({ type, id, ...svgProps }, ref) => {
    return (
      <svg
        {...svgProps}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 21.5V19.2L15.8 19.45C17.25 19.75 18.6 18.7 18.7 17.25L19 14L20.45 13.4C20.95 13.2 21.15 12.6 20.85 12.1L19 9C18.7 5.2 16.55 1.5 11 1.5C5.3 1.5 2.5 5.7 2.5 10C2.5 11.85 3.15 13.45 4.15 14.8C5.05 16.05 5.5 17.55 5.5 19.05V21.45H14.5V21.5Z"
          fill={`url(#face-${id})`}
        />
        <path
          d="M14.5 21.5V19.2L11 18.5V21.5H14.5Z"
          fill={colorMap[type].eye}
        />
        <path
          d="M16.75 11.5C17.1642 11.5 17.5 11.1642 17.5 10.75C17.5 10.3358 17.1642 10 16.75 10C16.3358 10 16 10.3358 16 10.75C16 11.1642 16.3358 11.5 16.75 11.5Z"
          fill={colorMap[type].neck}
        />
        <path
          d="M10.7 1.5C6.15 1.5 2.5 5.15 2.5 9.7C2.5 15.25 5.5 15.4 5.5 19L6.8 18.55C7.85 18.2 8.75 17.4 9.15 16.35L10.55 12.95L13.5 11.5V8.5C13.5 8.5 17 6.6 17 3.35C15.5 2.1 12.85 1.5 10.7 1.5Z"
          fill={`url(#hair-${id})`}
        />
        <path
          d="M10.5 1.04999C10.2 1.04999 10 1.24999 10 1.54999V8.49999C10 8.79999 10.2 8.99999 10.5 8.99999C10.8 8.99999 11 8.79999 11 8.49999V1.54999C11 1.24999 10.8 1.04999 10.5 1.04999ZM18.45 15.95C14.5 15.95 13.3 13.5 13.25 13.4C13.15 13.15 12.85 13.05 12.6 13.15C12.35 13.25 12.25 13.55 12.35 13.8C12.4 13.95 13.85 16.95 18.45 16.95C18.75 16.95 18.95 16.75 18.95 16.45C18.95 16.15 18.7 15.95 18.45 15.95Z"
          fill={colorMap[type].headband}
        />
        <path
          d="M18.5 17.5C19.0523 17.5 19.5 17.0523 19.5 16.5C19.5 15.9477 19.0523 15.5 18.5 15.5C17.9477 15.5 17.5 15.9477 17.5 16.5C17.5 17.0523 17.9477 17.5 18.5 17.5Z"
          fill={colorMap[type].microphone}
        />
        <path
          d="M10.5 15C12.433 15 14 13.433 14 11.5C14 9.567 12.433 8 10.5 8C8.567 8 7 9.567 7 11.5C7 13.433 8.567 15 10.5 15Z"
          fill={`url(#earphoneOuter-${id})`}
        />
        <path
          d="M10.5 13.5C11.6046 13.5 12.5 12.6046 12.5 11.5C12.5 10.3954 11.6046 9.5 10.5 9.5C9.39543 9.5 8.5 10.3954 8.5 11.5C8.5 12.6046 9.39543 13.5 10.5 13.5Z"
          fill={colorMap[type].earphoneInner}
        />
        <defs>
          <linearGradient
            id={`face-${id}`}
            x1="11.7455"
            y1="1.5"
            x2="11.7455"
            y2="21.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].face[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].face[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
          <linearGradient
            id={`hair-${id}`}
            x1="9.75"
            y1="1.5"
            x2="9.75"
            y2="19"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].hair[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].hair[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
          <linearGradient
            id={`earphoneOuter-${id}`}
            x1="10.5"
            y1="8"
            x2="10.5"
            y2="15"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={colorMap[type].earphoneOuter[0]}
              style={{ transition: "0.2s" }}
            />
            <stop
              offset="1"
              stopColor={colorMap[type].earphoneOuter[1]}
              style={{ transition: "0.2s" }}
            />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);

CustomerSupportIcon.displayName = "CustomerSupportIcon";

export default CustomerSupportIcon;
