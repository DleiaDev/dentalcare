import { ComponentProps, useActionState, useState } from "react";
// import { createTreatment } from "@/actions/Treatment";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import DrawerFooter from "@/components/DrawerFooter";
import Form from "./Form";

type FormProps = ComponentProps<typeof Form>;

export default function CreateDrawer({}) {
  const formId = "treatment-create-form";

  const [isPending, setIsPending] = useState(false);

  function handleFinish(data: FormProps["data"]) {
    // createTreatment(data)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   })
    //   .finally(() => {
    //     setIsPending(false);
    //   });
  }

  return (
    <Drawer
      trigger={<Button>Add Treatment</Button>}
      title="Add new treatment"
      spinner={isPending}
      content={<Form formId={formId} onFinish={handleFinish} />}
      footer={
        <DrawerFooter
          formId={formId}
          nextButtonText="Save"
          showBackButton={false}
        />
      }
    />
  );
}
