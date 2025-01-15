"use client";

import Button from "@/components/Button";
import TextInput from "@/components/Form/TextInput";
import H3 from "@/components/H3";
import H4 from "@/components/H4";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import ImageInput from "./Inputs/ImageInput";
import TagInput from "./Inputs/TagInput";
import StatusInput from "./Inputs/StatusInput";
import {
  CreatePeripheralFormData,
  CreatePeripheralFormSchema,
  UpdatePeripheralFormData,
  UpdatePeripheralFormSchema,
} from "@/zod/Peripheral";
import CategoryInput from "./Inputs/CategoryInput";
import TextArea from "@/components/Form/TextArea";
import VendorInput from "./Inputs/VendorInput";
import AttachmentsInput from "./Inputs/AttachmentsInput";
import useSpinner from "@/hooks/useSpinner";
import { createPeripheral, updatePeripheral } from "@/actions/Peripheral";
import NumberInput from "@/components/Form/NumberInput";
import { useMemo } from "react";
import { PeripheralWithRelations } from "@prisma/zod/modelSchema/PeripheralSchema";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

type Props = {
  clinicId: string;
  peripheral?: PeripheralWithRelations;
};

function getDefaultValues(peripheral?: PeripheralWithRelations) {
  if (peripheral)
    return {
      name: peripheral.name,
      vendorId: peripheral.vendorId,
      statusId: peripheral.statusId,
      tagIds: peripheral.Tags.map((tag) => tag.id),
      series: peripheral.series,
      categoryId: peripheral.categoryId,
      weight: peripheral.weight,
      sku: peripheral.sku,
      barcode: peripheral.barcode,
      description: peripheral.description,
      attachments: [],
      attachmentIds: peripheral.Attachments.map((a) => a.id),
    };
  return {
    tagIds: [],
    attachments: [],
  };
}

export default function Form({ clinicId, peripheral }: Props) {
  const { withSpinner } = useSpinner();
  const defaultData = useMemo(() => getDefaultValues(peripheral), [peripheral]);
  const schema = useMemo(
    () =>
      peripheral ? UpdatePeripheralFormSchema : CreatePeripheralFormSchema,
    [peripheral],
  );

  const title = peripheral?.name ?? "New periphral";

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultData,
  });

  const { toast } = useToast();
  const router = useRouter();

  const createUser = (data: CreatePeripheralFormData) => {
    withSpinner(async () => {
      try {
        const { data: peripheral, errors } = await createPeripheral(data);
        if (errors) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An error has occurred",
          });
        } else {
          toast({
            variant: "success",
            title: "Success",
            description: "Peripheral has been created",
          });
          router.push(`/peripherals/${peripheral.id}`);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error has occurred",
        });
      }
    });
  };

  const updateUser = (data: UpdatePeripheralFormData) => {
    withSpinner(async () => {
      try {
        const { errors } = await updatePeripheral(data);
        if (errors) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An error has occurred",
          });
        } else {
          toast({
            variant: "success",
            title: "Success",
            description: "Information updated",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error has occurred",
        });
      }
    });
  };

  const handleSubmit = methods.handleSubmit(
    (data: CreatePeripheralFormData | UpdatePeripheralFormData) => {
      if (peripheral) updateUser(data as UpdatePeripheralFormData);
      else createUser(data as CreatePeripheralFormData);
    },
  );

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-7xl mx-auto" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <H3>{title}</H3>
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
        <div className="@container">
          <div className="flex flex-col @4xl:flex-row @4xl:gap-12">
            {/* Left */}
            <div className="w-72">
              <ImageInput imageId={peripheral?.imageId} />
              <TagInput tags={peripheral?.Tags} />
              <StatusInput status={peripheral?.Status} />
            </div>

            {/* Right */}
            <div className="border border-border rounded-xl flex-1 p-8">
              <H4>Product details</H4>
              <div className="grid gap-7 grid-cols-2 [&>*]:mb-0">
                <VendorInput vendor={peripheral?.Vendor} />
                <div></div>
                <TextInput name="name" label="* Product name" />
                <TextInput
                  name="series"
                  label="Series"
                  labelDescription="(optional)"
                />
                <CategoryInput category={peripheral?.Category} />
                <NumberInput
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
                <TextInput
                  name="sku"
                  label="SKU"
                  labelDescription="(optional)"
                />
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
                <AttachmentsInput attachments={peripheral?.Attachments} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
