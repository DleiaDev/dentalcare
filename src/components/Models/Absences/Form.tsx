import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CreateAbsenceFormData, CreateAbsenceFormSchema } from "@/zod/Absence";
import { BaseSyntheticEvent, ReactNode } from "react";
import NumberInput from "@/components/Form/NumberInput";
import Select from "@/components/Form/Select";
import DateInput from "@/components/Form/DateInput";
import { WeekdayShortEnum, Weekdays } from "@/zod/utils/weekday";
import ToggleInput from "@/components/Form/ToggleInput";
import RadioGroup from "@/components/Form/RadioGroup";
import { Months } from "@/zod/utils/months";
import { capitalize, toDateInput } from "@/lib/utils";
import TextInput from "@/components/Form/TextInput";
import { formDataToRRule } from "@/lib/rrule";

export type Data = CreateAbsenceFormData;
type Form = z.infer<typeof CreateAbsenceFormSchema>;

function Label({ children }: { children: ReactNode }) {
  return <div className="mb-0 w-36 text-gray-700">{children}</div>;
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-4 mb-7">{children}</div>;
}

function transformDataBeforeSubmit(form: Form): Data {
  const data = { ...form };

  // Frequency
  if (data.frequency === "Daily") {
    delete data.weeklyByWeekday;
    delete data.monthlyByDay_Nth;
    delete data.monthlyByDay_Weekday;
    delete data.monthlyByMonthday_Day;
    delete data.yearlyByDay_Nth;
    delete data.yearlyByDay_Weekday;
    delete data.yearlyByDay_Month;
    delete data.yearlyByMonthday_Day;
    delete data.yearlyByMonthday_Month;
  } else if (data.frequency === "Weekly") {
    delete data.monthlyByDay_Nth;
    delete data.monthlyByDay_Weekday;
    delete data.monthlyByMonthday_Day;
    delete data.yearlyByDay_Nth;
    delete data.yearlyByDay_Weekday;
    delete data.yearlyByDay_Month;
    delete data.yearlyByMonthday_Day;
    delete data.yearlyByMonthday_Month;
  } else if (data.frequency === "Monthly") {
    delete data.weeklyByWeekday;
    delete data.yearlyByDay_Nth;
    delete data.yearlyByDay_Weekday;
    delete data.yearlyByDay_Month;
    delete data.yearlyByMonthday_Day;
    delete data.yearlyByMonthday_Month;
  } else if (data.frequency === "Yearly") {
    data.interval = 1;
    delete data.weeklyByWeekday;
    delete data.monthlyByDay_Weekday;
    delete data.monthlyByDay_Nth;
    delete data.monthlyByMonthday_Day;
  }

  // Radio
  if (data.by === "BYMONTHDAY") {
    delete data.monthlyByDay_Nth;
    delete data.monthlyByDay_Weekday;
    delete data.yearlyByDay_Nth;
    delete data.yearlyByDay_Weekday;
    delete data.yearlyByDay_Month;
  } else if (data.by === "BYDAY") {
    delete data.monthlyByMonthday_Day;
    delete data.yearlyByMonthday_Day;
    delete data.yearlyByMonthday_Month;
  }

  // End
  if (data.endType === "Never") {
    delete data.until;
    delete data.count;
  } else if (data.endType === "After") {
    delete data.until;
  } else if (data.endType === "On date") {
    delete data.count;
  }

  // Extra
  delete data.by;
  delete data.endType;

  return {
    ...data,
    text: capitalize(formDataToRRule(data).toText()),
  };
}

type Props = {
  formId?: string;
  data?: Form;
  defaultValues?: Form;
  className?: string;
  onFinish: (data: Data) => void;
};

export default function Form({
  formId,
  className,
  data,
  defaultValues,
  onFinish,
}: Props) {
  const today = new Date();
  const plus1Month = new Date(new Date().setMonth(today.getMonth() + 1));
  const defaultDay = today.getDate();
  const defaultMonth = `${today.getMonth() + 1}` as Form["yearlyByDay_Month"];

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(CreateAbsenceFormSchema),
    defaultValues: data ?? {
      key: new Date().getTime().toString(),
      entityType: "Employee",
      dtstart: toDateInput(today),
      frequency: "Daily",
      weeklyByWeekday: ["MO"],
      monthlyByDay_Nth: "1",
      monthlyByDay_Weekday: "MO",
      monthlyByMonthday_Day: defaultDay,
      yearlyByDay_Nth: "1",
      yearlyByDay_Weekday: "MO",
      yearlyByDay_Month: defaultMonth,
      yearlyByMonthday_Day: defaultDay,
      yearlyByMonthday_Month: defaultMonth,
      interval: 1,
      count: 1,
      until: toDateInput(plus1Month),
      by: "BYMONTHDAY",
      endType: "Never",
      ...defaultValues,
    },
  });

  const submit = methods.handleSubmit((form) => {
    const data = transformDataBeforeSubmit(form);
    onFinish(data);
    methods.reset();
  });

  const handleSubmit = (e?: BaseSyntheticEvent) => {
    e?.stopPropagation();
    submit(e);
  };

  const frequency = methods.watch("frequency");
  const endType = methods.watch("endType");

  return (
    <FormProvider {...methods}>
      <form id={formId} className={className} onSubmit={handleSubmit}>
        <Row>
          <Label>Name</Label>
          <TextInput name="name" containerClassName="mb-0 flex-1" />
        </Row>

        {/* dtstart */}
        <Row>
          <Label>Starting from</Label>
          <DateInput name="dtstart" containerClassName="mb-0" />
        </Row>

        {/* Frequency */}
        <Row>
          <Label>Repeat every</Label>
          {frequency !== "Yearly" && (
            <NumberInput
              name="interval"
              containerClassName="mb-0 w-[7ch]"
              min={1}
            />
          )}
          <Select
            name="frequency"
            containerClassName="mb-0"
            options={[
              { value: "Daily", label: "Day" },
              { value: "Weekly", label: "Week" },
              { value: "Monthly", label: "Month" },
              { value: "Yearly", label: "Year" },
            ]}
          />
        </Row>

        {/* By day (weekly) */}
        {frequency === "Weekly" && (
          <Row>
            <Label>On</Label>
            <ToggleInput
              name="weeklyByWeekday"
              min={1}
              containerClassName="mb-0"
              options={WeekdayShortEnum.options.map((day) => ({
                value: day,
                label: day,
              }))}
            />
          </Row>
        )}

        {/* By month day (monthly) */}
        {frequency === "Monthly" && (
          <Row>
            <RadioGroup
              name="by"
              textClassName="text-gray-700"
              labelClassName="border-0 p-0 min-w-36"
              containerClassName="mb-0"
              options={[{ label: "On day", value: "BYMONTHDAY" }]}
            />
            <Select
              name="monthlyByMonthday_Day"
              containerClassName="mb-0"
              options={[...Array(31).keys()].map((dayNum) => ({
                value: dayNum + 1,
                label: dayNum + 1,
              }))}
            />
            <div className="text-gray-700">of the month</div>
          </Row>
        )}

        {/* By day (monthly) */}
        {frequency === "Monthly" && (
          <Row>
            <RadioGroup
              name="by"
              textClassName="text-gray-700"
              labelClassName="border-0 p-0 min-w-36"
              containerClassName="mb-0"
              options={[{ label: "On the", value: "BYDAY" }]}
            />
            <Select
              name="monthlyByDay_Nth"
              containerClassName="mb-0"
              options={[
                { value: "1", label: "First" },
                { value: "2", label: "Second" },
                { value: "3", label: "Third" },
                { value: "4", label: "Fourth" },
                { value: "-1", label: "Last" },
              ]}
            />
            <Select
              name="monthlyByDay_Weekday"
              containerClassName="mb-0"
              options={Weekdays.map((weekday) => ({
                value: weekday.short,
                label: weekday.long,
              }))}
            />
            <div className="text-gray-700">of the month</div>
          </Row>
        )}

        {/* By month day (yearly) */}
        {frequency === "Yearly" && (
          <Row>
            <RadioGroup
              name="by"
              textClassName="text-gray-700"
              labelClassName="border-0 p-0 min-w-36"
              containerClassName="mb-0"
              options={[{ label: "On", value: "BYMONTHDAY" }]}
            />
            <Select
              name="yearlyByMonthday_Month"
              containerClassName="mb-0"
              options={Months.map((month) => ({
                value: `${month.number}`,
                label: month.short,
              }))}
            />
            <Select
              name="yearlyByMonthday_Day"
              containerClassName="mb-0"
              options={[...Array(31).keys()].map((dayNum) => ({
                value: dayNum + 1,
                label: dayNum + 1,
              }))}
            />
          </Row>
        )}

        {/* By day (yearly) */}
        {frequency === "Yearly" && (
          <Row>
            <RadioGroup
              name="by"
              textClassName="text-gray-700"
              labelClassName="border-0 p-0 min-w-36"
              containerClassName="mb-0"
              options={[{ label: "On the", value: "BYDAY" }]}
            />
            <Select
              name="yearlyByDay_Nth"
              containerClassName="mb-0"
              options={[
                { value: "1", label: "First" },
                { value: "2", label: "Second" },
                { value: "3", label: "Third" },
                { value: "4", label: "Fourth" },
                { value: "-1", label: "Last" },
              ]}
            />
            <Select
              name="yearlyByDay_Weekday"
              containerClassName="mb-0"
              options={Weekdays.map((weekday) => ({
                value: weekday.short,
                label: weekday.long,
              }))}
            />
            <div className="text-gray-700">of</div>
            <Select
              name="yearlyByDay_Month"
              containerClassName="mb-0"
              options={Months.map((month) => ({
                value: `${month.number}`,
                label: month.short,
              }))}
            />
          </Row>
        )}

        {/* End */}
        <Row>
          <Label>End</Label>
          <Select
            name="endType"
            containerClassName="mb-0"
            options={[
              { value: "Never", label: "Never" },
              { value: "After", label: "After" },
              { value: "On date", label: "On date" },
            ]}
          />
          {endType === "After" ? (
            <>
              <NumberInput
                name="count"
                min={1}
                containerClassName="mb-0"
                className="w-[7ch]"
              />
              <div className="text-gray-700">occurrence(s)</div>
            </>
          ) : endType === "On date" ? (
            <DateInput name="until" containerClassName="mb-0" />
          ) : null}
        </Row>
      </form>
    </FormProvider>
  );
}
