import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  //
});

export type Data = z.infer<typeof schema>;

type Props = {
  formId?: string;
  data?: Data;
  className?: string;
  onFinish: (data: Data) => void;
};

export default function Form({ formId, className, data, onFinish }: Props) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  const handleSubmit = methods.handleSubmit(onFinish);

  return (
    <FormProvider {...methods}>
      <form id={formId} className={className} onSubmit={handleSubmit}>
        Absence form
      </form>
    </FormProvider>
  );
}
