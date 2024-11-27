import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CreateAbsenceFormData, CreateAbsenceFormSchema } from "@/zod/Absence";
import { BaseSyntheticEvent, ReactNode } from "react";
import NumberInput from "@/components/Form/NumberInput";
import Select from "@/components/Form/Select";
import DateInput from "@/components/Form/DateInput";
import { DayOfWeekShortEnum, DaysOfWeek } from "@/zod/utils/dayOfWeek";
import ToggleInput from "@/components/Form/ToggleInput";
import RadioGroup from "@/components/Form/RadioGroup";
import { Months } from "@/zod/utils/months";
import { toDateInput } from "@/lib/utils";
import TextInput from "@/components/Form/TextInput";

export type Data = CreateAbsenceFormData;
type Form = z.infer<typeof CreateAbsenceFormSchema>;

function Label({ children }: { children: ReactNode }) {
  return <div className="mb-0 w-36 text-gray-700">{children}</div>;
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-4 mb-7">{children}</div>;
}

function cleanDataBeforeSubmit(form: Form): Data {
  const formData = { ...form };
  // Frequency
  if (formData.frequency === "Daily") {
    delete formData.byDay;
    delete formData.byDayNum;
    delete formData.byDayOfWeek;
    delete formData.byMonth;
    delete formData.byMonthDay;
  } else if (formData.frequency === "Weekly") {
    delete formData.byDayNum;
    delete formData.byDayOfWeek;
    delete formData.byMonth;
    delete formData.byMonthDay;
  } else if (formData.frequency === "Monthly") {
    delete formData.byMonth;
  } else if (formData.frequency === "Yearly") {
    delete formData.byDay;
    delete formData.interval;
  }

  // Radio
  if (formData.frequency === "Monthly" && formData.by === "BYMONTHDAY") {
    delete formData.byDayNum;
    delete formData.byDayOfWeek;
  } else if (formData.frequency === "Monthly" && formData.by === "BYDAY") {
    delete formData.byMonthDay;
  } else if (formData.frequency === "Yearly" && formData.by === "BYMONTHDAY") {
    delete formData.byDayNum;
    delete formData.byDayOfWeek;
  } else if (formData.frequency === "Yearly" && formData.by === "BYDAY") {
    delete formData.byMonthDay;
  }

  // End
  if (formData.endType === "Never") {
    delete formData.until;
    delete formData.count;
  } else if (formData.endType === "After") {
    delete formData.until;
  } else if (formData.endType === "On date") {
    delete formData.count;
  }

  // Extra
  delete formData.by;
  delete formData.endType;

  return formData as Data;
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
  const plus1Month = new Date(today.setMonth(today.getMonth() + 1));

  const methods = useForm({
    resolver: zodResolver(CreateAbsenceFormSchema),
    defaultValues: data ?? {
      key: new Date().getTime().toString(),
      entityType: "Employee",
      dtstart: toDateInput(today),
      frequency: "Daily",
      byDayNum: "1",
      byDay: ["MO"],
      byMonthDay: today.getDate(),
      byMonth: `${today.getMonth() + 1}` as Form["byMonth"],
      byDayOfWeek: "MO",
      interval: 1,
      count: 1,
      until: toDateInput(plus1Month),
      by: "BYMONTHDAY",
      endType: "After",
      ...defaultValues,
    },
  });

  const handleSubmit = (e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    return methods.handleSubmit((form) => {
      const data = cleanDataBeforeSubmit(form);
      onFinish(data);
      methods.reset();
    })(e);
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
            <NumberInput name="interval" containerClassName="mb-0 w-[7ch]" />
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
              name="byDay"
              min={1}
              containerClassName="mb-0"
              options={DayOfWeekShortEnum.options.map((day) => ({
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
              name="byMonthDay"
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
              name="byDayNum"
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
              name="byDayOfWeek"
              containerClassName="mb-0"
              options={DaysOfWeek.map((dayOfWeek) => ({
                value: dayOfWeek.short,
                label: dayOfWeek.long,
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
              name="byMonth"
              containerClassName="mb-0"
              options={Months.map((month) => ({
                value: `${month.number}`,
                label: month.short,
              }))}
            />
            <Select
              name="byMonthDay"
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
              name="byDayNum"
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
              name="byDayOfWeek"
              containerClassName="mb-0"
              options={DaysOfWeek.map((dayOfWeek) => ({
                value: dayOfWeek.short,
                label: dayOfWeek.long,
              }))}
            />
            <div className="text-gray-700">of</div>
            <Select
              name="byMonth"
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
