import Progress from "./Progress";
import { getClinic } from "@/lib/clinic_dev";
import Step1, { Data as Step1Data } from "./Step1";
import Step2, { Data as Step2Data } from "./Step2";
import Step3, { Data as Step3Data } from "./Step3";
import Step4, { Data as Step4Data } from "./Step4";

type Step = 1 | 2 | 3 | 4;

type Props = {
  formId?: string;
  step: Step;
  data: {
    step1?: Step1Data;
    step2?: Step2Data;
    step3?: Step3Data;
    step4?: Step4Data;
  };
  onStepFinish: (
    step: Step,
    data: Step1Data | Step2Data | Step3Data | Step4Data,
  ) => void;
};

export default function Create({ formId, step, data, onStepFinish }: Props) {
  const clinic = getClinic();
  return (
    <div className="flex flex-col gap-14">
      <Progress step={step} />
      {step === 1 && (
        <Step1
          formId={formId}
          data={data.step1}
          clinic={clinic}
          onFinish={(data) => onStepFinish(1, data)}
        />
      )}
      {step === 2 && (
        <Step2
          formId={formId}
          data={data.step2}
          clinic={clinic}
          onFinish={(data) => onStepFinish(2, data)}
        />
      )}
      {step === 3 && (
        <Step3
          formId={formId}
          data={data.step3}
          clinic={clinic}
          onFinish={(data) => onStepFinish(3, data)}
        />
      )}
      {step === 4 && (
        <Step4
          formId={formId}
          data={data.step4}
          clinic={clinic}
          onFinish={(data) => onStepFinish(4, data)}
        />
      )}
    </div>
  );
}
