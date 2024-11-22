import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import DrawerFooter from "@/components/DrawerFooter";
import Form from "./Form";
import { ComponentProps, useState } from "react";

type FormProps = ComponentProps<typeof Form>;

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
        <DrawerFooter
          formId={formId}
          nextButtonDisabled={currentStep === 4}
          backButtonDisabled={currentStep === 1}
          goBackward={goBackward}
        />
      }
    />
  );
}
