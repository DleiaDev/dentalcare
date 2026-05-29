import Dialog, { DialogRef } from "@/components/Dialog";
import SingleSelect from "@/components/Form/SingleSelect";
import { trpc } from "@/trpc/client";
import { useId, useRef, useState } from "react";
import CreateForm, {
  getDefaultValues,
} from "@/components/Models/PeripheralVendors/CreateForm";
import { PeripheralVendor } from "@/zod/PeripheralVendor";
import { useFormContext } from "react-hook-form";
import DialogFooter from "@/components/DialogFooter";

type Props = {
  containerClassName?: string;
  vendor?: PeripheralVendor;
};

export default function VendorInput({ containerClassName, vendor }: Props) {
  const name = "vendorId";
  const { setValue } = useFormContext();
  const dialogRef = useRef<DialogRef>(null);
  const [isPending, setIsPending] = useState(false);
  const [newVendorName, setNewVendorName] = useState("");
  const [isFetchAllowed, setIsFetchAllowed] = useState(false);

  const formId = useId();

  const utils = trpc.useUtils();

  const {
    data: vendors,
    error,
    isFetching,
  } = trpc.peripherals.getAllVendors.useQuery(undefined, {
    enabled: isFetchAllowed,
  });

  const options = vendors
    ? vendors.map((vendor) => ({
        value: vendor.id,
        label: vendor.name,
        description: vendor.description,
      }))
    : vendor
      ? [
          {
            value: vendor.id,
            label: vendor.name,
            description: vendor.description,
          },
        ]
      : [];

  const handleCreated = async (data: PeripheralVendor) => {
    dialogRef.current?.close();
    await utils.peripherals.getAllVendors.invalidate();
    setValue(name, data.id);
  };

  const onDialogClose = () => {
    setNewVendorName("");
  };

  const handleOnFirstOpen = () => {
    setIsFetchAllowed(true);
  };

  const handleCreateClick = (query: string) => {
    dialogRef.current?.open();
    setNewVendorName(query);
  };

  const newVendorFormData = {
    ...getDefaultValues(),
    name: newVendorName,
  };

  return (
    <>
      <Dialog
        ref={dialogRef}
        desktopType="modal"
        title="Create a new vendor"
        spinner={isPending}
        trigger={""}
        content={
          <CreateForm
            formId={formId}
            data={newVendorFormData}
            autoFocusName
            setIsPending={setIsPending}
            onCreated={handleCreated}
          />
        }
        footer={
          <DialogFooter
            formId={formId}
            showBackButton={false}
            nextButtonText="Save"
          />
        }
        onClose={onDialogClose}
      />
      <SingleSelect
        name={name}
        label="* Vendor"
        containerClassName={containerClassName}
        isFetching={isFetching}
        fetchingFailed={!!error?.message}
        createButtonItemName="vendor"
        // editLinkHref={editLinkHref}
        // editLinkItemNamePlural="vendors"
        options={options}
        onFirstOpen={handleOnFirstOpen}
        handleCreateClick={handleCreateClick}
      />
    </>
  );
}
