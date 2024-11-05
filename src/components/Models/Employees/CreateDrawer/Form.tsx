import React, { useState } from "react";
import Progress from "./Progress";
import Step1, { Schema as Step1Schema } from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

type Props = {
  formId?: string;
};

type Form = {
  step1?: Step1Schema;
};

export default function Create({ formId }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<Form>({});

  const handleFinishStep1 = (data: Step1Schema) => {
    setForm({ ...form, step1: data });
    setCurrentStep(1);
  };

  return (
    <div className="flex flex-col gap-14">
      <Progress currentStep={currentStep} />
      {currentStep === 0 && (
        <Step1 formId={formId} onFinish={handleFinishStep1} />
      )}
      {currentStep === 1 && <Step2 />}
      {currentStep === 2 && <Step3 />}
      {currentStep === 3 && <Step4 />}
    </div>
  );
}
