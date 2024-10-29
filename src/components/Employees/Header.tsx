"use client";

import Count from "@/components/Count";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import Steps from "@/components/Steps";
import {
  CalendarIcon,
  CalendarX2Icon,
  StethoscopeIcon,
  UserPenIcon,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className="flex items-center justify-between">
      <Count icon="stethoscope" count={8} text="Doctor(s)" />
      <div>
        <Drawer
          trigger={<Button>Add Doctor</Button>}
          title="Add new doctor staff"
          body={
            <div>
              <Steps
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
                    icon: CalendarIcon,
                    title: "Working Hours",
                  },
                  {
                    icon: CalendarX2Icon,
                    title: "Days Off",
                  },
                ]}
              />
              <Button
                onClick={() => {
                  if (currentStep > 3) setCurrentStep(0);
                  else setCurrentStep(currentStep + 1);
                }}
              >
                Click me
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
}
