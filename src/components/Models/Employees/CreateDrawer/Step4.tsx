import { useState } from "react";
import { Clinic } from "@/zod/Clinic";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs";
import HolidayForm, {
  Data as HolidayFormData,
} from "@/components/Models/Holidays/Form";
import AbsenceForm, {
  Data as AbsenceFormData,
} from "@/components/Models/Absences/Form";

export type Data = {};

type Props = {
  formId?: string;
  data?: Data;
  clinic: Clinic;
  onFinish: (data: Data) => void;
};

export default function Step4({ clinic }: Props) {
  const [tab, setTab] = useState("Holiday");

  const entries = [...clinic.Holidays, ...clinic.Absences];

  const onHolidaysFinish = (data: HolidayFormData) => {
    console.log(data);
  };

  const onAbsencesFinish = (data: AbsenceFormData) => {
    console.log(data);
  };

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
        trigger={<Button>Add holidays or absences</Button>}
        title={
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="border-b border-b-border">
              <TabsTrigger value="Holiday" className="flex-1">
                Add Holiday
              </TabsTrigger>
              <TabsTrigger value="Absence" className="flex-1">
                Add Absence
              </TabsTrigger>
            </TabsList>
          </Tabs>
        }
        titleClassName="flex-1"
        titleContainerClassName="pb-0 gap-10"
        content={
          tab === "Holiday" ? (
            <HolidayForm clinic={clinic} onFinish={onHolidaysFinish} />
          ) : tab === "Absence" ? (
            <AbsenceForm onFinish={onAbsencesFinish} />
          ) : null
        }
      />
    </div>
  );
}
