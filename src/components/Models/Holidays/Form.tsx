import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Clinic } from "@/zod/Clinic";
import {
  Holiday,
  CreateHolidaysFormData,
  CreateHolidaysFormSchema,
} from "@/zod/Holiday";
import CountryPicker from "@/components/Form/CountryPicker";
import Select from "@/components/Form/Select";
import { formatDate } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import Button from "@/components/Button";
import { PlusIcon, XIcon } from "lucide-react";
import { BaseSyntheticEvent } from "react";
import { HolidaysTypes } from "date-holidays";

const schema = z.object({
  holidays: CreateHolidaysFormSchema,
});

type HolidayFieldProps = {
  index: number;
  clinic: Clinic;
  onDeleteClick: () => void;
};

function getHolidayObjId(holiday: HolidaysTypes.Holiday) {
  return `${holiday.name}-${holiday.date}`;
}

function HolidayField({ index, clinic, onDeleteClick }: HolidayFieldProps) {
  const { watch, setValue } = useFormContext();

  const handleCountryCodeChange = () => {
    setValue(`holidays.${index}.holidayObjId`, "");
    setValue(`holidays.${index}.holidayObj`, undefined);
    setValue(`holidays.${index}.text`, undefined);
  };

  const countryCode = watch(`holidays.${index}.countryCode`);

  const {
    data: holidays = [],
    isFetching,
    error,
  } = trpc.holidays.getHolidayByCountry.useQuery(
    {
      countryCode,
    },
    {
      enabled: !!countryCode,
      staleTime: Infinity,
    },
  );

  const handleHolidayObjIdChange = (holidayObjId: string) => {
    const holidayObj = holidays.find(
      (holiday) => getHolidayObjId(holiday) === holidayObjId,
    );
    if (!holidayObj) return;
    setValue(`holidays.${index}.holidayObj`, holidayObj);
    setValue(
      `holidays.${index}.text`,
      `${formatDate(holidayObj.start)} - ${formatDate(holidayObj.end)}`,
    );
  };

  const clinicHolidaysMap = clinic.Holidays.reduce(
    (acc, holiday) => {
      acc[holiday.name] = true;
      return acc;
    },
    {} as Record<Holiday["name"], true>,
  );

  return (
    <div className="flex gap-4 mb-7">
      <CountryPicker
        name={`holidays.${index}.countryCode`}
        onValueChange={handleCountryCodeChange}
        containerClassName="mb-0 min-w-0"
      />

      <Select
        name={`holidays.${index}.holidayObjId`}
        containerClassName="mb-0 min-w-0 flex-1"
        isFetching={isFetching}
        fetchingFailed={!!error?.message}
        placeholder="Select a holiday"
        onValueChange={handleHolidayObjIdChange}
        options={holidays.map((holiday) => ({
          value: getHolidayObjId(holiday),
          label: holiday.name,
          description: `${formatDate(holiday.start)} - ${formatDate(holiday.end)}`,
          disabled:
            countryCode === clinic.countryCode &&
            clinicHolidaysMap[holiday.name] !== undefined,
          disabledReason:
            countryCode === clinic.countryCode &&
            clinicHolidaysMap[holiday.name] !== undefined
              ? "Clinic already celebrates this holiday"
              : undefined,
        }))}
      />
      <Button
        variant="ghost"
        color="destructive"
        className="min-w-0 mt-1.5"
        onClick={onDeleteClick}
      >
        <XIcon className="w-5 h-5" />
      </Button>
    </div>
  );
}

export type Data = CreateHolidaysFormData;

type Props = {
  entityType: Holiday["entityType"];
  formId?: string;
  data?: Data;
  clinic: Clinic;
  className?: string;
  onFinish: (data: Data) => void;
};

function createEmptyHoliday(entityType: Holiday["entityType"], clinic: Clinic) {
  return {
    key: new Date().getTime().toString(),
    entityType,
    countryCode: clinic.countryCode,
    holidayObjId: "",
    holidayObj: {
      name: "",
      date: "",
    },
    text: "",
  };
}

export default function Form({
  entityType,
  formId,
  data,
  clinic,
  className,
  onFinish,
}: Props) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      holidays: data ?? [createEmptyHoliday(entityType, clinic)],
    },
  });

  const submit = methods.handleSubmit(({ holidays }) => {
    onFinish(holidays);
    methods.reset();
  });

  const handleSubmit = (e?: BaseSyntheticEvent) => {
    e?.stopPropagation();
    submit(e);
  };

  const { append, fields, remove } = useFieldArray({
    control: methods.control,
    name: "holidays",
  });

  const addHoliday = () => {
    append(createEmptyHoliday(entityType, clinic));
  };

  return (
    <FormProvider {...methods}>
      <form id={formId} className={className} onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <HolidayField
            key={field.key}
            index={index}
            clinic={clinic}
            onDeleteClick={() => remove(index)}
          />
        ))}
        <div className="flex justify-end">
          <Button variant="text" onClick={addHoliday}>
            <PlusIcon className="h-5 w-5" />
            Add
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
