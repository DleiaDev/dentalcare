import Dialog, { DialogRef } from "@/components/Dialog";
import SingleSelect from "@/components/Form/SingleSelect";
import { trpc } from "@/trpc/client";
import { useId, useRef, useState } from "react";
import CreateForm from "../../PeripheralStatuses/CreateForm";
import { PeripheralStatus } from "@/zod/PeripheralStatus";
import { useFormContext } from "react-hook-form";
import DialogFooter from "@/components/DialogFooter";
import StatusCircle from "@/components/StatusCircle";
import { cn } from "@/lib/utils";

export default function StatusInput() {
  const name = "statusId";
  const { setValue } = useFormContext();
  const dialogRef = useRef<DialogRef>(null);
  const [newStatusName, setNewStatusName] = useState("");
  const [isFetchAllowed, setIsFetchAllowed] = useState(false);

  const formId = useId();

  const utils = trpc.useUtils();

  const {
    data: statuses = [],
    error,
    isFetching,
  } = trpc.peripherals.getAllStatuses.useQuery(undefined, {
    enabled: isFetchAllowed,
  });

  const handleCreated = (data: PeripheralStatus) => {
    dialogRef.current?.close();
    utils.peripherals.getAllStatuses.invalidate();
    setValue(name, data.id);
  };

  const onDialogClose = () => {
    setNewStatusName("");
  };

  const handleOnFirstOpen = () => {
    setIsFetchAllowed(true);
  };

  const handleCreateClick = (query: string) => {
    dialogRef.current?.open();
    setNewStatusName(query);
  };

  const setIsPending = (isPending: boolean) => {
    dialogRef.current?.setIsPending(isPending);
  };

  const newStatusFormData = {
    name: newStatusName,
    color: "",
  };

  return (
    <>
      <Dialog
        ref={dialogRef}
        desktopType="modal"
        title="Create a new status"
        trigger={""}
        content={
          <CreateForm
            formId={formId}
            data={newStatusFormData}
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
        label="Status"
        labelDescription="(optional)"
        className="max-w-full"
        isFetching={isFetching}
        fetchingFailed={!!error?.message}
        createButtonItemName="status"
        // editLinkHref={editLinkHref}
        // editLinkItemNamePlural="statuses"
        options={statuses.map((status) => ({
          value: status.id,
          label: status.name,
          description: status.description,
          icon: ({ className, ...props }) => (
            <StatusCircle
              {...props}
              style={{ backgroundColor: status.color }}
              className={cn(className, "min-w-4 min-h-4")}
            />
          ),
        }))}
        onFirstOpen={handleOnFirstOpen}
        handleCreateClick={handleCreateClick}
      />
    </>
  );
}
