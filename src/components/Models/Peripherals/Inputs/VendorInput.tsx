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
};

export default function VendorInput({ containerClassName }: Props) {
  const { setValue } = useFormContext();
  const dialogRef = useRef<DialogRef>(null);
  const [newVendorName, setNewVendorName] = useState("");
  const [isFetchAllowed, setIsFetchAllowed] = useState(false);

  const formId = useId();

  const utils = trpc.useUtils();

  const {
    data: vendors = [],
    error,
    isFetching,
  } = trpc.peripherals.getAllVendors.useQuery(undefined, {
    enabled: isFetchAllowed,
  });

  const handleCreated = (data: PeripheralVendor) => {
    dialogRef.current?.close();
    utils.peripherals.getAllVendors.invalidate();
    setValue("Vendor", data.id);
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

  const setIsPending = (isPending: boolean) => {
    dialogRef.current?.setIsPending(isPending);
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
        name="Vendor"
        label="Vendor"
        containerClassName={containerClassName}
        isFetching={isFetching}
        fetchingFailed={!!error?.message}
        createButtonItemName="vendor"
        // editLinkHref={editLinkHref}
        // editLinkItemNamePlural="vendors"
        options={vendors.map((vendor) => ({
          value: vendor.id,
          label: vendor.name,
          description: vendor.description,
        }))}
        onFirstOpen={handleOnFirstOpen}
        handleCreateClick={handleCreateClick}
      />
    </>
  );
}
