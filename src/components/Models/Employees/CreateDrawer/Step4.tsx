import Button from "@/components/Button";
import Dialog, { type DialogRef } from "@/components/Dialog";
import DialogFooter from "@/components/DialogFooter";
import AbsenceForm, {
  Data as AbsenceFormData,
} from "@/components/Models/Absences/Form";
import HolidayForm, {
  Data as HolidayFormData,
} from "@/components/Models/Holidays/Form";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs";
import { capitalize, cn } from "@/lib/utils";
import { Clinic } from "@/zod/Clinic";
import { PlusIcon, XIcon } from "lucide-react";
import { BaseSyntheticEvent, useRef, useState } from "react";

export type Data = {
  Holidays: HolidayFormData;
  Absences: AbsenceFormData[];
};

type Props = {
  formId?: string;
  data?: Data;
  clinic: Clinic;
  onFinish: (data: Data) => void;
};

export default function Step4({ data, formId, clinic, onFinish }: Props) {
  const dialogRef = useRef<DialogRef>(null);
  const [tab, setTab] = useState("Absence");
  const [holidayInputs, setHolidayInputs] = useState<HolidayFormData>(
    data?.Holidays ?? [],
  );
  const [absenceInputs, setAbsenceInputs] = useState<AbsenceFormData[]>(
    data?.Absences ?? [],
  );

  const entries = [
    ...clinic.Holidays.map((holiday) => ({
      type: "Holiday",
      key: holiday.id,
      name: holiday.name,
      text: holiday.text,
      entityType: holiday.entityType,
    })),
    ...clinic.Absences.map((absence) => ({
      type: "Absence",
      key: absence.id,
      name: absence.name,
      text: absence.text,
      entityType: absence.entityType,
    })),
    ...holidayInputs.map((holidayInput) => ({
      type: "Holiday",
      key: holidayInput.key,
      name: holidayInput.holidayObj.name,
      text: holidayInput.text,
      entityType: "EMPLOYEE",
    })),
    ...absenceInputs.map((absenceInput) => ({
      type: "Absence",
      key: absenceInput.key,
      name: absenceInput.name,
      text: absenceInput.text,
      entityType: absenceInput.entityType,
    })),
  ];

  const onHolidaysFinish = (holidays: HolidayFormData) => {
    setHolidayInputs(holidays);
    dialogRef.current?.close();
  };

  const onAbsencesFinish = (absence: AbsenceFormData) => {
    setAbsenceInputs([...absenceInputs, absence]);
    dialogRef.current?.close();
  };

  const handleSubmit = (e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    const data = {
      Holidays: holidayInputs,
      Absences: absenceInputs,
    };
    onFinish(data);
  };

  const deleteEntry = (entry: (typeof entries)[number]) => {
    if (entry.type === "Holiday") {
      setHolidayInputs(
        holidayInputs.filter((holidayInput) => holidayInput.key !== entry.key),
      );
    } else if (entry.type === "Absence") {
      setAbsenceInputs(
        absenceInputs.filter((absenceInput) => absenceInput.key !== entry.key),
      );
    }
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="animate-in fade-in duration-500"
    >
      <div className="flex flex-col gap-4 mb-4">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="border border-border px-5 py-3 rounded-xl flex flex-col justify-center"
          >
            <div className="relative">
              {entry.entityType === "EMPLOYEE" && (
                <Button
                  intent="ghost"
                  color="destructive"
                  className="absolute -top-2 -right-4"
                  onClick={() => deleteEntry(entry)}
                >
                  <XIcon />
                </Button>
              )}
              <div className="font-medium">{entry.name}</div>
              <div className="text-gray-600">{entry.text}</div>
              <div
                className={cn(
                  "text-white rounded-lg text-sm py-0.5 px-3 mt-2 inline-block font-medium",
                  entry.entityType === "CLINIC"
                    ? "bg-gray-600"
                    : "bg-primary/50",
                )}
              >
                {capitalize(entry.entityType.toLowerCase())}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Dialog
          desktopType="drawer"
          ref={dialogRef}
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
                entityType="EMPLOYEE"
                formId="Holiday"
                clinic={clinic}
                className={cn(tab !== "Holiday" && "hidden")}
                onFinish={onHolidaysFinish}
              />
              <AbsenceForm
                entityType="EMPLOYEE"
                formId="Absence"
                className={cn(tab !== "Absence" && "hidden")}
                onFinish={onAbsencesFinish}
              />
            </>
          }
          footer={
            <DialogFooter
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
