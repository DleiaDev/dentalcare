import Button from "@/components/Button";
import Drawer, { Ref } from "@/components/Drawer";
import DrawerFooter from "@/components/DrawerFooter";
import AbsenceForm, {
  Data as AbsenceFormData,
} from "@/components/Models/Absences/Form";
import HolidayForm, {
  Data as HolidayFormData,
} from "@/components/Models/Holidays/Form";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs";
import { cn } from "@/lib/utils";
import { Clinic } from "@/zod/Clinic";
import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";

export type Data = {
  holidays: HolidayFormData;
};

type Props = {
  formId?: string;
  data?: Data;
  clinic: Clinic;
  onFinish: (data: Data) => void;
};

export default function Step4({ data, formId, clinic, onFinish }: Props) {
  const DrawerRef = useRef<Ref>(null);
  const [tab, setTab] = useState("Absence");
  const [holidayData, setHolidayData] = useState<HolidayFormData>(
    data?.holidays ?? [],
  );
  const [absenceInputs, setAbsenceInputs] = useState<AbsenceFormData[]>(
    data?.absences ?? [],
  );

  const entries = [
    ...clinic.Holidays.map((holiday) => ({
      key: holiday.id,
      name: holiday.name,
      text: holiday.text,
      entityType: holiday.entityType,
    })),
    ...clinic.Absences.map((absence) => ({
      key: absence.id,
      name: absence.name,
      text: absence.text,
      entityType: absence.entityType,
    })),
    ...holidayData.map((holidayInput) => ({
      key: holidayInput.key,
      name: holidayInput.name,
      text: holidayInput.text,
      entityType: holidayInput.entityType,
    })),
    ...absenceInputs.map((absenceInput) => ({
      key: absenceInput.id,
      name: absenceInput.name,
      text: "TODO",
      entityType: absenceInput.entityType,
    })),
  ];

  const onHolidaysFinish = (holidays: HolidayFormData) => {
    setHolidayData(holidays);
    DrawerRef.current?.closeModal();
  };

  const onAbsencesFinish = (absence: AbsenceFormData) => {
    setAbsenceInputs([...absenceInputs, absence]);
    DrawerRef.current?.closeModal();
  };

  const handleSubmit = () => {
    const data = {
      holidays: holidayData,
    };
    onFinish(data);
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 mb-4">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="border border-border px-5 py-3 rounded-xl flex flex-col justify-center"
          >
            <div>
              <div className="font-medium">{entry.name}</div>
              <div className="text-gray-600">{entry.text}</div>
              <div
                className={cn(
                  "text-white rounded-lg text-sm py-0.5 px-3 mt-2 inline-block font-medium",
                  entry.entityType === "Clinic"
                    ? "bg-gray-600"
                    : "bg-primary/50",
                )}
              >
                {entry.entityType}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Drawer
          ref={DrawerRef}
          trigger={
            <Button intent="text">
              <PlusIcon className="h-5 w-5 mr-1" />
              Add
            </Button>
          }
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
            <>
              <HolidayForm
                formId="Holiday"
                clinic={clinic}
                data={holidayData.length ? holidayData : undefined}
                className={cn(tab !== "Holiday" && "hidden")}
                onFinish={onHolidaysFinish}
              />
              <AbsenceForm
                formId="Absence"
                className={cn(tab !== "Absence" && "hidden")}
                onFinish={onAbsencesFinish}
              />
            </>
          }
          footer={
            <DrawerFooter
              formId={tab}
              nextButtonText="Finish"
              showBackButton={false}
            />
          }
        />
      </div>
    </form>
  );
}
