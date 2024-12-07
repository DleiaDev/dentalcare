"use client";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Button";
import TextInput from "@/components/Form/TextInput";
import H3 from "@/components/H3";
import H4 from "@/components/H4";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "./ImageUpload";
import { MAXIMUM_B, MAXIMUM_MB } from "@/constants/storage";

const schema = z.object({
  image: z
    .instanceof(File)
    .optional()
    .superRefine((file, ctx) => {
      if (!file) return;
      if (file.size > MAXIMUM_B)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `File is too large, the limit is ${MAXIMUM_MB}MB`,
        });
    }),
});

export default function CreateForm() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const handleSubmit = methods.handleSubmit(
    (data) => {
      console.log(data);
    },
    (errors) => {
      console.log(errors);
    },
  );

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-[120rem] mx-auto" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <H3>New peripherals</H3>
          <div className="flex gap-3">
            <Button intent="ghost" size="2xl" color="black">
              Cancel
            </Button>
            <Button intent="fill" size="2xl" type="submit">
              Save
            </Button>
          </div>
        </div>

        {/* Columns */}
        <div className="flex gap-12">
          {/* Left */}
          <div>
            {/* Image */}
            <ImageUpload />
          </div>

          {/* Right */}
          <div className="border border-border rounded-xl flex-1 p-8">
            <H4>Product details</H4>
            <div className="flex">
              <TextInput label="Product name" />
              <TextInput label="Series" />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
