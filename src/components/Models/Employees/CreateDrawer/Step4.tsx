import Button from "@/components/Button";
import { areEqualDates, formatDate } from "@/lib/utils";
import { Clinic } from "@/zod/Clinic";
import Drawer from "@/components/Drawer";

export type Data = {};

type Props = {
  formId?: string;
  data?: Data;
  clinic: Clinic;
  onFinish: (data: Data) => void;
};

export default function Step4({ clinic }: Props) {
  const entries = [...clinic.Holidays, ...clinic.Absences];
  return (
    <div>
      <div className="flex flex-col gap-4 mb-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="border border-border px-5 py-3 rounded-xl flex flex-col justify-center"
          >
            <div>
              <div className="font-medium">{entry.name}</div>
              <div className="text-gray-600">{entry.text}</div>
              <div className="bg-gray-600 text-white rounded-lg text-sm py-0.5 px-3 mt-2 inline-block font-medium">
                Clinic
              </div>
            </div>
          </div>
        ))}
      </div>

      <Drawer
        trigger={<Button>Add holiday</Button>}
        title="Add holiday"
        content={
          <div>
            <div>Hello</div>
          </div>
        }
      />
    </div>
  );
}
