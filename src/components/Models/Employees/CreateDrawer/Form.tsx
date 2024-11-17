import Progress from "./Progress";
import Step1, { Data as Step1Data } from "./Step1";
import Step2, { Data as Step2Data } from "./Step2";
import Step3, { Data as Step3Data } from "./Step3";
import Step4 from "./Step4";

type Step = 1 | 2 | 3 | 4;

type Props = {
  formId?: string;
  step: Step;
  data: {
    step1?: Step1Data;
    step2?: Step2Data;
    step3?: Step3Data;
  };
  onStepFinish: (step: Step, data: Step1Data | Step2Data | Step3Data) => void;
};

const clinic = {
  timeFormat: "24",
  WorkingDays: [
    {
      dayOfWeek: "Monday",
      TimeSlots: [
        {
          id: "d9fed619-6931-4278-abfb-313b68ce22ef",
          startTime: "09:00",
          endTime: "13:00",
        },
        {
          id: "f35aef1e-d75a-42a3-a75c-809dd3be645a",
          startTime: "14:00",
          endTime: "17:00",
        },
      ],
    },
    {
      dayOfWeek: "Tuesday",
      TimeSlots: [
        {
          id: "11ef8c35-44ea-4950-8390-40337a02bffe",
          startTime: "09:00",
          endTime: "17:00",
        },
      ],
    },
    {
      dayOfWeek: "Wednesday",
      TimeSlots: [
        {
          id: "0ca5a3df-caff-415c-8b8d-ebf3827ef3a1",
          startTime: "09:00",
          endTime: "17:00",
        },
      ],
    },
    {
      dayOfWeek: "Thursday",
      TimeSlots: [
        {
          id: "4a4cd6db-9683-421d-9dd3-396f3ee80cba",
          startTime: "09:00",
          endTime: "17:00",
        },
      ],
    },
    {
      dayOfWeek: "Friday",
      TimeSlots: [
        {
          id: "fbfbd177-4973-4b2d-aabe-9a978242ec19",
          startTime: "09:00",
          endTime: "17:00",
        },
      ],
    },
  ],
  Holidays: [
    {
      id: "3eb62419-6ef8-4e7e-920c-daaec0f7db7e",
      name: "New Year Holiday",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-01-02"),
      text: "January 01, 2024 - January 02, 2024",
    },
    {
      id: "c492050a-0a04-41ec-89a8-f7e257b4f094",
      name: "Christmas",
      startDate: new Date("2024-01-07"),
      endDate: new Date("2024-01-07"),
      text: "January 07, 2024",
    },
  ],
  Absences: [
    {
      id: "54b47949-7c39-47c8-99b4-4a364a7aee98",
      name: "Electrical repair",
      rrule: "DTSTART:20241218\nRRULE:FREQ=DAILY;INTERVAL=1;UNTIL=20241220",
      entityId: "43f1963a-39ce-4b0c-99d9-5554c69b0aae",
      entityType: "Clinic",
      createdAt: new Date("2024-04-07"),
      updatedAt: new Date("2024-04-07"),
      text: "December 19, 2024 - December 21, 2024",
    },
    {
      id: "7ace6c26-fe0f-4e93-b68d-cd360367fa40",
      name: "Non working days",
      rrule: "DTSTART:20241218\nRRULE:FREQ=DAILY;INTERVAL=1;UNTIL=20241220",
      entityId: "43f1963a-39ce-4b0c-99d9-5554c69b0aae",
      entityType: "Clinic",
      createdAt: new Date("2023-07-04"),
      updatedAt: new Date("2023-07-04"),
      text: "Every 3 weeks on Wednesday, Friday",
    },
  ],
};

export default function Create({ formId, step, data, onStepFinish }: Props) {
  return (
    <div className="flex flex-col gap-14">
      <Progress step={step} />
      {step === 1 && (
        <Step1
          formId={formId}
          data={data.step1}
          onFinish={(data) => onStepFinish(1, data)}
        />
      )}
      {step === 2 && (
        <Step2
          formId={formId}
          data={data.step2}
          onFinish={(data) => onStepFinish(2, data)}
        />
      )}
      {step === 3 && (
        <Step3
          formId={formId}
          data={data.step3}
          clinic={clinic}
          onFinish={(data) => onStepFinish(3, data)}
        />
      )}
      {step === 4 && (
        <Step4
          formId={formId}
          data={data.step4}
          clinic={clinic}
          onFinish={(data) => console.log(data)}
        />
      )}
    </div>
  );
}
