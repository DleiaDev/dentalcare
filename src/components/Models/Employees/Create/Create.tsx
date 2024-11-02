import React, { useState } from "react";
import Progress from "./Progress";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Button from "@/components/Button";

export default function Create() {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div>
      <Progress currentStep={currentStep} className="mb-14" />
      {currentStep === 0 && <Step1 />}
      {currentStep === 1 && <Step2 />}
      {currentStep === 2 && <Step3 />}
      {currentStep === 3 && <Step4 />}
      {/* <Button */}
      {/*   onClick={() => { */}
      {/*     if (currentStep > 3) setCurrentStep(0); */}
      {/*     else setCurrentStep(currentStep + 1); */}
      {/*   }} */}
      {/* > */}
      {/*   Next */}
      {/* </Button> */}
    </div>
  );
}
