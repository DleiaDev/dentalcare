import { z } from "zod";
import {
  FieldError,
  FieldErrorsImpl,
  FormProvider,
  Merge,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkingDay } from "@/zod/WorkingDay";
import { Clinic } from "@/zod/Clinic";
import { Weekday, WeekdayEnum } from "@/zod/utils/weekday";
import BooleanInput from "@/components/Form/BooleanInput";
import TimeInput from "@/components/Form/TimeInput";
import Button from "@/components/Button";
import ErrorMessage from "@/components/Form/ErrorMessage";
import Tooltip from "@/components/Tooltip";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimeSlot } from "@/zod/TimeSlot";
import { useMemo } from "react";
import { CreateEmployeeFormSchema } from "@/zod/Employee";

export type Data = Pick<
  z.infer<ReturnType<typeof CreateEmployeeFormSchema>>,
  "WorkingDays"
>;

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
                variant="text"
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
  day: Weekday;
  disabled: boolean;
  onCheckedChange: (checked: boolean, day: Weekday) => void;
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
  const schema = useMemo(
    () =>
      CreateEmployeeFormSchema(clinic).pick({
        WorkingDays: true,
      }),
    [clinic],
  );

  const methods = useForm<Data>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: data ?? {
      WorkingDays: clinic.WorkingDays,
    },
  });

  const errors = methods.formState.errors?.WorkingDays;

  const handleSubmit = methods.handleSubmit(onFinish);

  const { append, remove, update, fields } = useFieldArray({
    control: methods.control,
    name: "WorkingDays",
  });

  const isChecked = (day: Weekday) => {
    const field = fields.find((workingDay) => workingDay.weekday === day);
    return field !== undefined;
  };

  const handleCheckedChange = (checked: boolean, day: Weekday) => {
    if (checked === true) {
      const clinicSettingWorkingDay = clinic.WorkingDays.find(
        (workingDay) => workingDay.weekday === day,
      ) as WorkingDay;
      append({
        weekday: day,
        TimeSlots: clinicSettingWorkingDay.TimeSlots,
      });
    } else {
      const index = fields.findIndex(
        (workingDay) => workingDay.weekday === day,
      );
      remove(index);
    }
  };

  const addTimeSlot = (day: Weekday) => {
    const index = fields.findIndex((workingDay) => workingDay.weekday === day);
    if (index === -1) return;
    const field = fields[index];
    const clinicWorkingDay = clinic.WorkingDays.find(
      (workingDay) => workingDay.weekday === day,
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

  const weekdayToIndex = fields.reduce(
    (acc, workingDay, index) => {
      acc[workingDay.weekday] = index;
      return acc;
    },
    {} as Record<Weekday, number>,
  );

  const dayToClinicWorking = clinic.WorkingDays.reduce(
    (acc, workingDay) => {
      acc[workingDay.weekday] = true;
      return acc;
    },
    {} as Record<Weekday, boolean>,
  );

  return (
    <FormProvider {...methods}>
      <form
        id={formId}
        onSubmit={handleSubmit}
        className="animate-in fade-in duration-500"
      >
        {WeekdayEnum.options.map((day) => (
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
                field={fields[weekdayToIndex[day]]}
                fieldIndex={weekdayToIndex[day]}
                errorMessages={errors && errors[weekdayToIndex[day]]?.TimeSlots}
                onDelete={deleteTimeSlot}
              />
              {weekdayToIndex[day] !== undefined && (
                <Button
                  variant="text"
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
