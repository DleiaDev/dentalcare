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
  return (
    <div>
      <div className="flex flex-col gap-4 mb-4">
        {clinic.Holidays.map((holiday) => (
          <div
            key={holiday.id}
            className="h-20 border border-border px-5 rounded-xl flex flex-col justify-center"
          >
            <div className="font-medium">{holiday.name}</div>
            <div className="text-gray-600">
              {areEqualDates(holiday.startDate, holiday.endDate)
                ? formatDate(holiday.startDate)
                : `${formatDate(holiday.startDate)} - ${formatDate(holiday.endDate)}`}
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
