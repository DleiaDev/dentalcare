import Label from "@/components/Form/Label";
import TextInput from "@/components/Form/TextInput";
import {
  CreatePeripheralTagFormData,
  CreatePeripheralTagFormSchema,
} from "@/zod/PeripheralTag";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TagIcon from "@/icons/tag.svg";
import { Badge } from "@/components/ui/badge";

type Props = {
  formId?: string;
  data?: CreatePeripheralTagFormData;
  autoFocusName?: boolean;
  onFinish: (data: CreatePeripheralTagFormData) => void;
};

export default function CreateForm({
  formId,
  data,
  autoFocusName,
  onFinish,
}: Props) {
  const methods = useForm({
    resolver: zodResolver(CreatePeripheralTagFormSchema),
    defaultValues: data ?? {
      name: "",
    },
  });

  const submit = methods.handleSubmit(onFinish);

  const handleSubmit = (e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    submit(e);
  };

  const name = methods.watch("name");

  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={handleSubmit}>
        <div className="mb-7">
          <Label>Preview</Label>
          <Badge color="accent" className="text-base">
            <TagIcon className="h-5 w-5 mr-2 text-gray-700" />
            {name}
          </Badge>
        </div>
        <TextInput name="name" label="Tag name" autoFocus={autoFocusName} />
        <TextInput name="description" label="Description" />
      </form>
    </FormProvider>
  );
}
