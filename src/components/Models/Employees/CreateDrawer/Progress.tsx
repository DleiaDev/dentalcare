import Steps from "@/components/Steps";
import {
  CalendarClockIcon,
  CalendarX2Icon,
  StethoscopeIcon,
  UserPenIcon,
} from "lucide-react";

type Props = {
  step: number;
  className?: string;
};

export default function Progress({ step, className }: Props) {
  return (
    <Steps
      className={className}
      activeIndex={step - 1}
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
          title: "Holidays and Absences",
        },
      ]}
    />
  );
}
