import Progress from "./Progress";
import Step1, { Schema as Step1Schema } from "./Step1";
import Step2, { Schema as Step2Schema } from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

type Step = 1 | 2 | 3 | 4;

type Props = {
  formId?: string;
  step: Step;
  data: {
    step1?: Step1Schema;
    step2?: Step2Schema;
  };
  onStepFinish: (step: Step, data: Step1Schema | Step2Schema) => void;
};

export default function Create({ formId, step, data, onStepFinish }: Props) {
  return (
    <div className="flex flex-col gap-14">
      <Progress step={step} />
      {step === 1 && (
        <Step1
          formId={formId}
          data={data.step1}
          onFinish={(data) => onStepFinish(1, data)}
        />
      )}
      {step === 2 && (
        <Step2
          formId={formId}
          data={data.step2}
          onFinish={(data) => onStepFinish(2, data)}
        />
      )}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
    </div>
  );
}
