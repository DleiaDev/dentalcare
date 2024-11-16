import Button from "@/components/Button";
import Drawer, { useDrawerContext } from "@/components/Drawer";
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
  const { close } = useDrawerContext();
  return (
    <div className="flex justify-end gap-6">
      <Button intent="ghost" color="black" size="xl" onClick={close}>
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

export default function CreateDrawer({}) {
  const formId = "employee-create-form";

  const [currentStep, setCurrentStep] = useState<FormProps["step"]>(4);
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
    <Drawer
      trigger={<Button>Add Doctor</Button>}
      title="Add new doctor staff"
      content={
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
