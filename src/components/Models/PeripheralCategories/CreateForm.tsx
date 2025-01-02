import TextInput from "@/components/Form/TextInput";
import {
  CreatePeripheralCategoryFormData,
  CreatePeripheralCategoryFormSchema,
  PeripheralCategory,
} from "@/zod/PeripheralCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createPeripheralCategory } from "@/actions/PeripheralCategory";
import setServerErrors from "@/lib/utils/setServerErrors";
import { useToast } from "@/hooks/use-toast";

type Props = {
  formId?: string;
  data?: CreatePeripheralCategoryFormData;
  autoFocusName?: boolean;
  onCreated: (data: PeripheralCategory) => void;
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
    resolver: zodResolver(CreatePeripheralCategoryFormSchema),
    defaultValues: data ?? {
      name: "",
    },
  });

  const { toast } = useToast();

  const submit = methods.handleSubmit((data) => {
    setIsPending(true);
    createPeripheralCategory(data)
      .then(({ errors, data }) => {
        if (errors) {
          setServerErrors(errors, methods.setError);
        } else if (data) {
          onCreated(data);
          toast({
            title: "Success",
            description: "Category has been created",
          });
        }
      })
      .catch((error: Error) => {
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
        <TextInput
          name="name"
          label="* Category name"
          autoFocus={autoFocusName}
        />
        <TextInput
          name="description"
          label="Description"
          labelDescription="(optional)"
        />
      </form>
    </FormProvider>
  );
}
