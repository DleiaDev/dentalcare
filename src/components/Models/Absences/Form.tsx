import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  //
});

export type Data = z.infer<typeof schema>;

type Props = {
  data?: Data;
  onFinish: (data: Data) => void;
};

export default function Form({ data, onFinish }: Props) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  const handleSubmit = methods.handleSubmit(onFinish);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>Absence form</form>
    </FormProvider>
  );
}
