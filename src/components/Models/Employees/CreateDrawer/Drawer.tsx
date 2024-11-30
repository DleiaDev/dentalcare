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
  const [isSubmitting, setIsSubmitting] = useState(false);

  function goForward() {
    if (currentStep < 4) setCurrentStep((currentStep + 1) as FormProps["step"]);
  }

  function goBackward() {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as FormProps["step"]);
  }

  function finish(data: FormProps["data"]) {
    setIsSubmitting(true);
  }

  const handleStepFinish: FormProps["onStepFinish"] = (step, stepData) => {
    const newData = { ...data, [`step${step}`]: stepData };
    setData(newData);
    if (currentStep < 4) goForward();
    else finish(newData);
  };

  return (
    <Drawer
      trigger={<Button>Add Doctor</Button>}
      title="Add new doctor staff"
      spinner={isSubmitting}
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
          nextButtonText={currentStep === 4 ? "Finish" : "Next"}
          backButtonDisabled={currentStep === 1}
          goBackward={goBackward}
        />
      }
    />
  );
}
