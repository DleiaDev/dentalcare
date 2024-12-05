import RadioGroup from "@/components/Form/RadioGroup";
import SectionTitle from "@/components/Form/SectionTitle";
import TextArea from "@/components/Form/TextArea";
import TextInput from "@/components/Form/TextInput";
import { trpc } from "@/trpc/client";
import {
  CreateTreatmentFormData,
  CreateTreatmentFormSchema,
} from "@/zod/Treatment";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  formId?: string;
  data?: CreateTreatmentFormData;
  onFinish: (data: CreateTreatmentFormData) => void;
};

export default function Create({ formId, data, onFinish }: Props) {
  const methods = useForm({
    resolver: zodResolver(CreateTreatmentFormSchema),
    defaultValues: data ?? {
      name: "",
    },
  });

  const handleSubmit = methods.handleSubmit(
    (data) => {
      console.log(data);
    },
    (errors) => {
      console.log(errors);
    },
  );

  const {
    data: categories = [],
    error,
    isFetching,
  } = trpc.treatments.getAllCategories.useQuery();

  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-14">
          <div>
            <SectionTitle>Basic Info</SectionTitle>
            <TextInput name="name" label="Treatment name" />
            <RadioGroup
              name="category"
              label="Treatment Category"
              allowCreate={true}
              isFetching={isFetching}
              fetchingFailed={!!error?.message}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
            <TextArea
              name="description"
              label="Treatment Description"
              rows={5}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
