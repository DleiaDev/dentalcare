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
      startDate: "2024-01-01",
      endDate: "2024-02-02",
    },
    {
      id: "c492050a-0a04-41ec-89a8-f7e257b4f094",
      name: "Christmas",
      startDate: "2024-01-07",
      endDate: "2024-02-07",
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
