import Svg from "@/components/Svg";
import { ComponentProps } from "react";

type Props = {
  count: number;
  text: string;
  icon: ComponentProps<typeof Svg>["name"];
};

export default function Header({ count, text, icon }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-gray-300 rounded-lg p-1">
        <Svg name={icon} className="text-gray-700 w-6 h-6" />
      </div>
      <div className="font-bold text-3xl">{count}</div>
      <div className="text-gray-600 font-semibold">{text}</div>
    </div>
  );
}
