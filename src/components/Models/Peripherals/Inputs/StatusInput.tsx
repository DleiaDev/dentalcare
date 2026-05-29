import Dialog, { DialogRef } from "@/components/Dialog";
import SingleSelect, { Option } from "@/components/Form/SingleSelect";
import { trpc } from "@/trpc/client";
import { useId, useRef, useState } from "react";
import CreateForm from "../../PeripheralStatuses/CreateForm";
import { useFormContext } from "react-hook-form";
import DialogFooter from "@/components/DialogFooter";
import StatusCircle from "@/components/StatusCircle";
import { cn } from "@/lib/utils";
import { PeripheralStatus } from "@prisma/zod/modelSchema/PeripheralStatusSchema";

type Props = {
  status?: PeripheralStatus | null;
};

function getOptions(statuses: PeripheralStatus[]): Option[] {
  return statuses.map((status) => ({
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
  }));
}

export default function StatusInput({ status }: Props) {
  const name = "statusId";
  const { setValue } = useFormContext();
  const dialogRef = useRef<DialogRef>(null);
  const [isPending, setIsPending] = useState(false);
  const [newStatusName, setNewStatusName] = useState("");
  const [isFetchAllowed, setIsFetchAllowed] = useState(false);

  const formId = useId();

  const utils = trpc.useUtils();

  const {
    data: statuses,
    error,
    isFetching,
  } = trpc.peripherals.getAllStatuses.useQuery(undefined, {
    enabled: isFetchAllowed,
  });

  const options = statuses
    ? getOptions(statuses)
    : status
      ? getOptions([status])
      : [];

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
        spinner={isPending}
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
        options={options}
        onFirstOpen={handleOnFirstOpen}
        handleCreateClick={handleCreateClick}
      />
    </>
  );
}
