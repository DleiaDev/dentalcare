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
  HolidayForm,
  HolidayFormData,
  HolidayFormSchema,
} from "@/zod/Holiday";
import CountryPicker from "@/components/Form/CountryPicker";
import Select from "@/components/Form/Select";
import { formatDate } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import Button from "@/components/Button";
import { PlusIcon, XIcon } from "lucide-react";
import { BaseSyntheticEvent } from "react";

type HolidayFieldProps = {
  index: number;
  clinic: Clinic;
  onDeleteClick: () => void;
};

function HolidayField({ index, clinic, onDeleteClick }: HolidayFieldProps) {
  const { watch, setValue } = useFormContext();

  const handleCountryCodeChange = () => {
    setValue(`holidays.${index}.holidayObjId`, "");
    setValue(`holidays.${index}.holidayObj`, undefined);
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
      (holiday) => holiday.date === holidayObjId,
    );
    setValue(`holidays.${index}.holidayObj`, holidayObj);
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
          value: holiday.date,
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
        intent="ghost"
        color="destructive"
        className="min-w-0 mt-1.5"
        onClick={onDeleteClick}
      >
        <XIcon className="w-5 h-5" />
      </Button>
    </div>
  );
}

export type Data = HolidayFormData[];

type Props = {
  formId?: string;
  data?: Data;
  clinic: Clinic;
  className?: string;
  onFinish: (data: Data) => void;
};

function transformDataToForm(holidays: Data): HolidayForm {
  return {
    holidays: holidays.map((holiday) => ({
      key: holiday.key,
      countryCode: holiday.countryCode,
      holidayObjId: holiday.key,
      holidayObj: {
        name: holiday.name,
        start: holiday.startDate,
        end: holiday.endDate,
      },
    })),
  };
}

function transformFormToData({ holidays }: HolidayForm): Data {
  return holidays.map((holiday) => ({
    key: holiday.holidayObjId,
    name: holiday.holidayObj.name,
    countryCode: holiday.countryCode,
    startDate: holiday.holidayObj.start,
    endDate: holiday.holidayObj.end,
    entityType: "Employee",
    text: `${formatDate(holiday.holidayObj.start)} - ${formatDate(holiday.holidayObj.end)}`,
  }));
}

export default function Form({
  formId,
  data,
  clinic,
  className,
  onFinish,
}: Props) {
  const defaultForm = data && transformDataToForm(data);

  const methods = useForm({
    resolver: zodResolver(HolidayFormSchema),
    defaultValues: defaultForm ?? {
      holidays: [
        {
          key: new Date().getTime().toString(),
          countryCode: clinic.countryCode,
          holidayObjId: "",
        },
      ],
    },
  });

  const handleSubmit = (e?: BaseSyntheticEvent) => {
    e?.stopPropagation();
    return methods.handleSubmit((form) => {
      onFinish(transformFormToData(form));
    })(e);
  };

  const { append, fields, remove } = useFieldArray({
    control: methods.control,
    name: "holidays",
  });

  const addHoliday = () => {
    append({
      key: new Date().getTime().toString(),
      countryCode: clinic.countryCode,
      holidayObjId: "",
      holidayObj: {
        name: "",
        start: new Date(),
        end: new Date(),
      },
    });
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
          <Button intent="text" onClick={addHoliday}>
            <PlusIcon className="h-5 w-5" />
            Add
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
