import { ComponentProps, useState } from "react";
import { createEmployee } from "@/actions/Employee";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import DialogFooter from "@/components/DialogFooter";
import Form from "./Form";

type FormProps = ComponentProps<typeof Form>;

export default function CreateDrawer({}) {
  const formId = "employee-create-form";

  const [currentStep, setCurrentStep] = useState<FormProps["step"]>(1);
  const [data, setData] = useState<FormProps["data"]>({});
  const [isPending, setIsPending] = useState(false);

  function goForward() {
    if (currentStep < 4) setCurrentStep((currentStep + 1) as FormProps["step"]);
  }

  function goBackward() {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as FormProps["step"]);
  }

  function finish(data: FormProps["data"]) {
    if (!data.step1 || !data.step2 || !data.step3 || !data.step4) return;
    setIsPending(true);
    createEmployee({
      ...data.step1,
      ...data.step2,
      ...data.step3,
      ...data.step4,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsPending(false);
      });
  }

  const handleStepFinish: FormProps["onStepFinish"] = (step, stepData) => {
    const newData = { ...data, [`step${step}`]: stepData };
    setData(newData);
    if (currentStep < 4) goForward();
    else finish(newData);
  };

  return (
    <Dialog
      desktopType="drawer"
      trigger={<Button>Add Doctor</Button>}
      title="Add new doctor staff"
      spinner={isPending}
      content={
        <Form
          formId={formId}
          step={currentStep}
          data={data}
          onStepFinish={handleStepFinish}
        />
      }
      footer={
        <DialogFooter
          formId={formId}
          nextButtonDisabled={isPending}
          nextButtonText={currentStep === 4 ? "Finish" : "Next"}
          backButtonDisabled={currentStep === 1}
          goBackward={goBackward}
        />
      }
    />
  );
}
