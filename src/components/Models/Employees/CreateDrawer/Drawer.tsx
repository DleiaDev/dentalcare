import Button from "@/components/Button";
import DrawerBase, { DrawerClose } from "@/components/Drawer";
import Form from "./Form";

function Footer({ formId }: { formId: string }) {
  return (
    <div className="flex justify-end gap-6">
      <DrawerClose>
        <Button intent="ghost" color="black" size="xl">
          Cancel
        </Button>
      </DrawerClose>
      <Button form={formId} type="submit" size="xl">
        Next
      </Button>
    </div>
  );
}

export default function Drawer({}) {
  const formId = "employee-create-form";
  return (
    <DrawerBase
      trigger={<Button>Add Doctor</Button>}
      title="Add new doctor staff"
      body={<Form formId={formId} />}
      footer={<Footer formId={formId} />}
    />
  );
}
