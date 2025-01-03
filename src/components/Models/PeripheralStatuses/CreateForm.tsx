import { createPeripheralStatus } from "@/actions/PeripheralStatus";
import Label from "@/components/Form/Label";
import TextInput from "@/components/Form/TextInput";
import { useToast } from "@/hooks/useToast";
import setServerErrors from "@/lib/utils/setServerErrors";
import {
  CreatePeripheralStatusFormData,
  CreatePeripheralStatusFormSchema,
  PeripheralStatus,
} from "@/zod/PeripheralStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ColorPicker from "@/components/Form/ColorPicker";
import StatusCircle from "@/components/StatusCircle";
import getRandomColor from "@/lib/utils/getRandomColor";

type Props = {
  formId?: string;
  data?: CreatePeripheralStatusFormData;
  autoFocusName?: boolean;
  onCreated: (data: PeripheralStatus) => void;
  setIsPending: (isPending: boolean) => void;
};

export default function CreateForm({
  formId,
  data,
  autoFocusName,
  onCreated,
  setIsPending,
}: Props) {
  const randomColor = getRandomColor();

  const defaultData = data
    ? {
        ...data,
        color: data.color || randomColor,
      }
    : {
        name: "",
        color: randomColor,
      };

  const methods = useForm({
    resolver: zodResolver(CreatePeripheralStatusFormSchema),
    defaultValues: defaultData,
  });

  const { toast } = useToast();

  const submit = methods.handleSubmit((data) => {
    setIsPending(true);
    createPeripheralStatus(data)
      .then(({ errors, data }) => {
        if (errors) {
          setServerErrors(errors, methods.setError);
        } else if (data) {
          onCreated(data);
          toast({
            title: "Success",
            description: "Status has been created",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error has occurred",
        });
      })
      .finally(() => {
        setIsPending(false);
      });
  });

  const handleSubmit = (e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    submit(e);
  };

  const name = methods.watch("name");
  const color = methods.watch("color");

  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={handleSubmit}>
        <div className="mb-7">
          <Label>Preview</Label>
          <div className="flex gap-2 items-center">
            <StatusCircle style={{ backgroundColor: color }} />
            <div className="font-semibold">{name}</div>
          </div>
        </div>
        <TextInput
          name="name"
          label="* Status name"
          autoFocus={autoFocusName}
        />
        <TextInput
          name="description"
          label="Description"
          labelDescription="(Optional)"
        />
        <ColorPicker name="color" label="* Color" />
      </form>
    </FormProvider>
  );
}
