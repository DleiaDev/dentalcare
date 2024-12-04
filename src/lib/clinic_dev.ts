import { Clinic } from "@/zod/Clinic";

export function getClinic(): Clinic {
  return {
    countryCode: "US",
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
        name: "New Year's Day",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-02"),
        entityType: "Clinic",
        text: "January 01, 2024 - January 02, 2024",
      },
      {
        id: "c492050a-0a04-41ec-89a8-f7e257b4f094",
        name: "Christmas",
        startDate: new Date("2024-01-07"),
        endDate: new Date("2024-01-07"),
        entityType: "Clinic",
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
}
