"use client";

import Button from "@/components/Button";
import TextInput from "@/components/Form/TextInput";
import H3 from "@/components/H3";
import H4 from "@/components/H4";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import ImageUpload from "./Inputs/ImageUpload";
import TagInput from "./Inputs/TagInput";
import StatusInput from "./Inputs/StatusInput";
import { CreatePeripheralFormSchema } from "@/zod/Peripheral";
import CategoryInput from "./Inputs/CategoryInput";
import TextArea from "@/components/Form/TextArea";
import VendorInput from "./Inputs/VendorInput";
import AttachmentsInput from "./Inputs/AttachmentsInput";

type Props = {
  clinicId: string;
};

export default function CreateForm({ clinicId }: Props) {
  const methods = useForm({
    resolver: zodResolver(CreatePeripheralFormSchema),
    defaultValues: {
      Tags: [],
      attachments: [],
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

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-7xl mx-auto" onSubmit={handleSubmit}>
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
          <div className="w-72">
            <ImageUpload />
            <TagInput />
            <StatusInput />
          </div>

          {/* Right */}
          <div className="border border-border rounded-xl flex-1 p-8">
            <H4>Product details</H4>
            <div className="grid gap-7 grid-cols-2 [&>*]:mb-0">
              <VendorInput />
              <div></div>
              <TextInput name="name" label="* Product name" />
              <TextInput
                name="Series"
                label="Series"
                labelDescription="(optional)"
              />
              <CategoryInput />
              <TextInput
                name="weight"
                label="Weight"
                labelDescription="(optional)"
                className="pr-9"
                containerClassName="relative"
                additionalElements={
                  <span className="absolute top-10 right-4 font-semibold">
                    lb
                  </span>
                }
              />
              <TextInput name="sku" label="SKU" labelDescription="(optional)" />
              <TextInput
                name="barcode"
                label="Barcode"
                labelDescription="(optional)"
              />
              <TextArea
                name="description"
                label="Description"
                labelDescription="(optional)"
                containerClassName="col-span-2"
                rows={3}
              />
              <AttachmentsInput />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
