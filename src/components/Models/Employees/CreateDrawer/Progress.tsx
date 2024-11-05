import Steps from "@/components/Steps";
import {
  CalendarClockIcon,
  CalendarX2Icon,
  StethoscopeIcon,
  UserPenIcon,
} from "lucide-react";

type Props = {
  currentStep: number;
  className?: string;
};

export default function Progress({ currentStep, className }: Props) {
  return (
    <Steps
      className={className}
      activeIndex={currentStep}
      steps={[
        {
          icon: UserPenIcon,
          title: "Staff Info",
        },
        {
          icon: StethoscopeIcon,
          title: "Assigned Services",
        },
        {
          icon: CalendarClockIcon,
          title: "Working Hours",
        },
        {
          icon: CalendarX2Icon,
          title: "Days Off",
        },
      ]}
    />
  );
}
