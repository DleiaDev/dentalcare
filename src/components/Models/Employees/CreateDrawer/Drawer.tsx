import Button from "@/components/Button";
import DrawerBase, { useDrawerContext } from "@/components/Drawer";
import Form from "./Form";
import { ComponentProps, useState } from "react";

type FormProps = ComponentProps<typeof Form>;

function Footer({
  formId,
  step,
  goBackward,
}: {
  formId: string;
  step: FormProps["step"];
  goBackward: () => void;
}) {
  const context = useDrawerContext();
  return (
    <div className="flex justify-end gap-6">
      <Button intent="ghost" color="black" size="xl" onClick={context.close}>
        Cancel
      </Button>
      <Button
        intent="outlined"
        size="xl"
        disabled={step === 1}
        onClick={goBackward}
      >
        Back
      </Button>
      <Button form={formId} size="xl" type="submit" disabled={step === 4}>
        Next
      </Button>
    </div>
  );
}

export default function Drawer({}) {
  const formId = "employee-create-form";

  const [currentStep, setCurrentStep] = useState<FormProps["step"]>(1);
  const [data, setData] = useState<FormProps["data"]>({});

  function goForward() {
    if (currentStep < 4) setCurrentStep((currentStep + 1) as FormProps["step"]);
  }

  function goBackward() {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as FormProps["step"]);
  }

  const handleStepFinish: FormProps["onStepFinish"] = (step, stepData) => {
    setData({ ...data, [`step${step}`]: stepData });
    goForward();
  };

  return (
    <DrawerBase
      trigger={<Button>Add Doctor</Button>}
      title="Add new doctor staff"
      body={
        <Form
          formId={formId}
          step={currentStep}
          data={data}
          onStepFinish={handleStepFinish}
        />
      }
      footer={
        <Footer formId={formId} step={currentStep} goBackward={goBackward} />
      }
    />
  );
}
