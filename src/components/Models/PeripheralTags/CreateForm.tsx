import Label from "@/components/Form/Label";
import TextInput from "@/components/Form/TextInput";
import {
  CreatePeripheralTagFormData,
  CreatePeripheralTagFormSchema,
  PeripheralTag,
} from "@/zod/PeripheralTag";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TagIcon from "@/icons/tag.svg";
import { Badge } from "@/components/ui/badge";
import { createPeripheralTag } from "@/actions/PeripheralTag";
import setServerErrors from "@/lib/utils/setServerErrors";
import { useToast } from "@/hooks/useToast";

type Props = {
  formId?: string;
  data?: CreatePeripheralTagFormData;
  autoFocusName?: boolean;
  onCreated: (data: PeripheralTag) => void;
  setIsPending: (isPending: boolean) => void;
};

export default function CreateForm({
  formId,
  data,
  autoFocusName,
  onCreated,
  setIsPending,
}: Props) {
  const methods = useForm({
    resolver: zodResolver(CreatePeripheralTagFormSchema),
    defaultValues: data ?? {
      name: "",
    },
  });

  const { toast } = useToast();

  const submit = methods.handleSubmit((data) => {
    setIsPending(true);
    createPeripheralTag(data)
      .then(({ errors, data }) => {
        if (errors) {
          setServerErrors(errors, methods.setError);
        } else if (data) {
          onCreated(data);
          toast({
            title: "Success",
            description: "Tag has been created",
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
        <TextInput name="name" label="* Tag name" autoFocus={autoFocusName} />
        <TextInput
          name="description"
          label="Description"
          labelDescription="(optional)"
        />
      </form>
    </FormProvider>
  );
}
