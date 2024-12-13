import CreateForm from "@/components/Models/Peripherals/CreateForm";
import { getClinic } from "@/lib/clinic_dev";

export default function Page() {
  const clinic = getClinic();

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <CreateForm clinicId={clinic.id} />
    </div>
  );
}
