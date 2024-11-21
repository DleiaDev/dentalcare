import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Clinic } from "@/zod/Clinic";
// import CountryPicker from "@/components/Form/CountryPicker";

const schema = z.object({
  countryCode: z.string(),
  holidayName: z.string(),
});

export type Data = z.infer<typeof schema>;

type Props = {
  clinic: Clinic;
  data?: Data;
  onFinish: (data: Data) => void;
};

export default function Form({ data, clinic, onFinish }: Props) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: data ?? {
      countryCode: clinic.countryCode,
    },
  });

  const handleSubmit = methods.handleSubmit(onFinish);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        Hello
        {/* <CountryPicker name="countryCode" /> */}
      </form>
    </FormProvider>
  );
}
