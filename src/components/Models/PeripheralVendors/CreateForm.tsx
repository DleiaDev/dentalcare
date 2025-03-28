import TextInput from "@/components/Form/TextInput";
import {
  CreatePeripheralVendorFormData,
  CreatePeripheralVendorFormSchema,
  PeripheralVendor,
} from "@/zod/PeripheralVendor";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createPeripheralVendor } from "@/actions/PeripheralVendor";
import setServerErrors from "@/lib/utils/setServerErrors";
import { useToast } from "@/hooks/useToast";
import TextArea from "@/components/Form/TextArea";
import PhoneInput from "@/components/Form/PhoneInput";
import EmailInput from "@/components/Form/EmailInput";

type Props = {
  formId?: string;
  data?: CreatePeripheralVendorFormData;
  autoFocusName?: boolean;
  onCreated: (data: PeripheralVendor) => void;
  setIsPending: (isPending: boolean) => void;
};

export function getDefaultValues() {
  return {
    name: "",
    address: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
  };
}

export default function CreateForm({
  formId,
  data,
  autoFocusName,
  onCreated,
  setIsPending,
}: Props) {
  const methods = useForm({
    resolver: zodResolver(CreatePeripheralVendorFormSchema),
    defaultValues: data ?? getDefaultValues(),
  });

  const { toast } = useToast();

  const submit = methods.handleSubmit((data) => {
    setIsPending(true);
    createPeripheralVendor(data)
      .then(({ errors, data }) => {
        if (errors) {
          setServerErrors(errors, methods.setError);
        } else if (data) {
          onCreated(data);
          toast({
            title: "Success",
            description: "Vendor has been created",
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

  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={handleSubmit} className="max-h-96">
        <TextInput
          name="name"
          label="* Vendor name"
          autoFocus={autoFocusName}
        />
        <TextArea
          name="description"
          label="Description"
          labelDescription="(optional)"
          rows={4}
        />
        <TextInput name="address" label="* Address" />
        <TextInput name="contact_name" label="* Contact name" />
        <div className="flex gap-7 *:flex-1">
          <PhoneInput name="contact_phone" label="* Contact phone" />
          <EmailInput name="contact_email" label="* Contact email" />
        </div>
      </form>
    </FormProvider>
  );
}
