import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import React, { FC, SVGProps } from "react";

type Step = {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
};

type Props = {
  steps: Step[];
  activeIndex: number;
};

function StepComponent({
  step,
  index,
  activeIndex,
}: {
  step: Step;
  index: number;
  activeIndex: number;
}) {
  const Icon = step.icon;
  const isActive = index === activeIndex;
  const isCompleted = index < activeIndex;
  return (
    <div
      key={step.title}
      className="flex flex-col flex-1 items-center relative overflow-hidden group"
    >
      <div
        className={cn(
          "w-14 h-14 rounded-full border-2 border-border mb-4 flex justify-center items-center transition-colors duration-500",
          isActive && "border-primary border-dashed",
          isCompleted && "border-success",
        )}
      >
        <div
          className={cn(
            "w-10 h-10 p-2 rounded-full text-gray-700 flex justify-center items-center transition-colors duration-500",
            isActive && "bg-primary text-white",
            isCompleted && "w-full h-full bg-success text-white",
          )}
        >
          {isCompleted ? (
            <CheckIcon className="w-6 h-6 animate-in fade-in duration-500" />
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </div>
      </div>
      <div className="text-sm text-gray-700 font-medium">STEP {index + 1}</div>
      <div className="font-semibold">{step.title}</div>
      <div
        className={cn(
          "absolute top-6 -left-10 w-1/2 h-1 group-first:hidden transition-colors duration-500",
          index <= activeIndex ? "bg-success" : "bg-border",
        )}
      ></div>
      <div
        className={cn(
          "absolute top-6 -right-10 w-1/2 h-1 group-last:hidden transition-colors duration-500",
          index === activeIndex && "bg-primary",
          index < activeIndex && "bg-success",
          index > activeIndex && "bg-border",
        )}
      ></div>
    </div>
  );
}

export default function Steps(props: Props) {
  return (
    <div className="flex justify-around">
      {props.steps.map((step, index) => (
        <StepComponent
          key={step.title}
          step={step}
          index={index}
          activeIndex={props.activeIndex}
        />
      ))}
    </div>
  );
}
