import {
  FieldError,
  FieldErrorsImpl,
  FormProvider,
  Merge,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateWorkingDayInput,
  CreateWorkingDayInputSchema,
  WorkingDay,
} from "@/zod/WorkingDay";
import { Clinic } from "@/zod/Clinic";
import { DayOfWeek, DayOfWeekEnum } from "@/zod/utils/dayOfWeek";
import BooleanInput from "@/components/Form/BooleanInput";
import TimeInput from "@/components/Form/TimeInput";
import Button from "@/components/Button";
import ErrorMessage from "@/components/Form/ErrorMessage";
import Tooltip from "@/components/Tooltip";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimeSlot } from "@/zod/TimeSlot";
import { useMemo } from "react";

export type Data = CreateWorkingDayInput;

type Props = {
  formId?: string;
  data?: Data;
  clinic: Clinic;
  onFinish: (data: Data) => void;
};

function TimeSlots({
  field,
  fieldIndex,
  errorMessages,
  onDelete,
}: {
  field?: Data["WorkingDays"][number];
  fieldIndex?: number;
  errorMessages?: Merge<
    FieldError,
    (Merge<FieldError, FieldErrorsImpl<TimeSlot>> | undefined)[]
  >;
  onDelete: (fieldIndex: number, timeSlotIndex: number) => void;
}) {
  const isWorkingDay = fieldIndex !== undefined && field !== undefined;
  const getError = (timeSlotIndex: number) => {
    if (!errorMessages || !errorMessages[timeSlotIndex]) return;
    const messages = errorMessages[timeSlotIndex];
    if (messages.startTime) return messages.startTime.message;
    if (messages.endTime) return messages.endTime.message;
  };
  const isInputInvalid = (
    name: "startTime" | "endTime",
    timeSlotIndex: number,
  ) => {
    if (!errorMessages || !errorMessages[timeSlotIndex]) return false;
    const messages = errorMessages[timeSlotIndex];
    return messages[name] !== undefined;
  };

  return (
    <>
      {isWorkingDay ? (
        field.TimeSlots.map((timeSlot, timeSlotIndex) => (
          <div
            key={timeSlot.id}
            className={cn(
              "flex items-start p-2 gap-4",
              getError(timeSlotIndex) && "bg-input-invalid rounded-lg",
            )}
          >
            {field.TimeSlots.length > 1 && (
              <Button
                intent="text"
                color="destructive"
                className="mt-2"
                onClick={() => onDelete(fieldIndex, timeSlotIndex)}
              >
                <X className="w-5 h-5" />
              </Button>
            )}
            <div>
              <div className="flex items-center gap-4">
                <TimeInput
                  name={`WorkingDays.${fieldIndex}.TimeSlots.${timeSlotIndex}.startTime`}
                  deps={`WorkingDays.${fieldIndex}.TimeSlots.${timeSlotIndex}.endTime`}
                  className={cn(
                    isInputInvalid("startTime", timeSlotIndex)
                      ? "border-error ring-error/20"
                      : "focus:border-primary ring-primary/20 ",
                  )}
                />
                <div className="text-gray-700">to</div>
                <TimeInput
                  name={`WorkingDays.${fieldIndex}.TimeSlots.${timeSlotIndex}.endTime`}
                  deps={`WorkingDays.${fieldIndex}.TimeSlots.${timeSlotIndex}.endTime`}
                  className={cn(
                    isInputInvalid("endTime", timeSlotIndex)
                      ? "border-error ring-error/20"
                      : "focus:border-primary ring-primary/20 ",
                  )}
                />
              </div>
              {getError(timeSlotIndex) && (
                <ErrorMessage className="text-center w-[37ch]">
                  {getError(timeSlotIndex)}
                </ErrorMessage>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-700">Not working on this day</div>
      )}
    </>
  );
}

export function Switch({
  checked,
  day,
  disabled,
  onCheckedChange,
}: {
  checked: boolean;
  day: DayOfWeek;
  disabled: boolean;
  onCheckedChange: (checked: boolean, day: DayOfWeek) => void;
}) {
  return disabled ? (
    <Tooltip
      content={`The clinic doesn't work on ${day}s`}
      className={cn(checked && "self-start")}
    >
      <BooleanInput
        type="switch"
        label={day}
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(checked, day)}
        disabled={disabled}
      />
    </Tooltip>
  ) : (
    <BooleanInput
      type="switch"
      label={day}
      checked={checked}
      onCheckedChange={(checked) => onCheckedChange(checked, day)}
      className={cn("mt-4", checked && "self-start")}
      disabled={disabled}
    />
  );
}

export default function Step3({ formId, data, clinic, onFinish }: Props) {
  const schema = useMemo(() => CreateWorkingDayInputSchema(clinic), [clinic]);

  const methods = useForm<Data>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: data ?? {
      WorkingDays: clinic.WorkingDays,
    },
  });

  const errors = methods.formState.errors?.WorkingDays;

  const handleSubmit = methods.handleSubmit(onFinish, (errors) => {
    console.log(errors);
  });

  const { append, remove, update, fields } = useFieldArray({
    control: methods.control,
    name: "WorkingDays",
  });

  const isChecked = (day: DayOfWeek) => {
    const field = fields.find((workingDay) => workingDay.dayOfWeek === day);
    return field !== undefined;
  };

  const handleCheckedChange = (checked: boolean, day: DayOfWeek) => {
    if (checked === true) {
      const clinicSettingWorkingDay = clinic.WorkingDays.find(
        (workingDay) => workingDay.dayOfWeek === day,
      ) as WorkingDay;
      append({
        dayOfWeek: day,
        TimeSlots: clinicSettingWorkingDay.TimeSlots,
      });
    } else {
      const index = fields.findIndex(
        (workingDay) => workingDay.dayOfWeek === day,
      );
      remove(index);
    }
  };

  const addTimeSlot = (day: DayOfWeek) => {
    const index = fields.findIndex(
      (workingDay) => workingDay.dayOfWeek === day,
    );
    if (index === -1) return;
    const field = fields[index];
    const clinicWorkingDay = clinic.WorkingDays.find(
      (workingDay) => workingDay.dayOfWeek === day,
    );
    if (!clinicWorkingDay) throw new Error("Clinic working day not found");
    update(index, {
      ...field,
      TimeSlots: [
        ...field.TimeSlots,
        {
          id: new Date().getTime().toString(),
          startTime: "",
          endTime: "",
        },
      ],
    });
  };

  const deleteTimeSlot = (fieldIndex: number, timeSlotIndex: number) => {
    const field = fields[fieldIndex];
    const TimeSlots = [...field.TimeSlots];
    TimeSlots.splice(timeSlotIndex, 1);
    update(fieldIndex, { ...field, TimeSlots });
  };

  const dayOfWeekToIndex = fields.reduce(
    (acc, workingDay, index) => {
      acc[workingDay.dayOfWeek] = index;
      return acc;
    },
    {} as Record<DayOfWeek, number>,
  );

  const dayToClinicWorking = clinic.WorkingDays.reduce(
    (acc, workingDay) => {
      acc[workingDay.dayOfWeek] = true;
      return acc;
    },
    {} as Record<DayOfWeek, boolean>,
  );

  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={handleSubmit}>
        {DayOfWeekEnum.options.map((day) => (
          <div
            key={day}
            className="flex justify-between gap-3 border-b border-b-border py-5 min-h-24 last:border-b-0"
          >
            <Switch
              checked={isChecked(day)}
              day={day}
              disabled={dayToClinicWorking[day] === undefined}
              onCheckedChange={handleCheckedChange}
            />
            <div className="flex flex-col justify-center items-end gap-2">
              <TimeSlots
                field={fields[dayOfWeekToIndex[day]]}
                fieldIndex={dayOfWeekToIndex[day]}
                errorMessages={
                  errors && errors[dayOfWeekToIndex[day]]?.TimeSlots
                }
                onDelete={deleteTimeSlot}
              />
              {dayOfWeekToIndex[day] !== undefined && (
                <Button
                  intent="text"
                  className="self-end flex items-center gap-1 mr-2"
                  onClick={() => addTimeSlot(day)}
                >
                  <Plus className="h-5 w-5" /> Add
                </Button>
              )}
            </div>
          </div>
        ))}
      </form>
    </FormProvider>
  );
}
