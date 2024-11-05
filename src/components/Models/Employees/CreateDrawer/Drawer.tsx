import Button from "@/components/Button";
import DrawerBase from "@/components/Drawer";
import Form from "./Form";

export default function Drawer({}) {
  return (
    <DrawerBase
      trigger={<Button>Add Doctor</Button>}
      title="Add new doctor staff"
      body={<Form />}
    />
  );
}
