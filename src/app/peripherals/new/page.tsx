import Form from "@/components/Models/Peripherals/Form";
import { getClinic } from "@/lib/clinic_dev";

export default function Page() {
  const clinic = getClinic();

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <Form clinicId={clinic.id} />
    </div>
  );
}
