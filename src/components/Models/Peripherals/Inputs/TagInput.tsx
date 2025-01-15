import { trpc } from "@/trpc/client";
import MultiSelect from "@/components/Form/MultiSelect";
import TagIcon from "@/icons/tag.svg";
import { useId, useRef, useState } from "react";
import Dialog, { type DialogRef } from "@/components/Dialog";
import DialogFooter from "@/components/DialogFooter";
import CreateForm from "@/components/Models/PeripheralTags/CreateForm";
import { useFormContext } from "react-hook-form";
import { PeripheralTag } from "@prisma/zod/modelSchema/PeripheralTagSchema";

type Props = {
  tags?: PeripheralTag[];
};

export default function TagInput({ tags }: Props) {
  const name = "tagIds";
  const dialogRef = useRef<DialogRef>(null);
  const [newTagName, setNewTagName] = useState("");
  const [isFetchAllowed, setIsFetchAllowed] = useState(false);
  const { setValue, getValues } = useFormContext();

  const formId = useId();

  const utils = trpc.useUtils();

  const {
    data: allTags,
    error,
    isFetching,
  } = trpc.peripherals.getAllTags.useQuery(undefined, {
    enabled: isFetchAllowed,
  });

  const options = allTags
    ? allTags.map((tag) => ({
        label: tag.name,
        value: tag.id,
        description: tag.description,
        icon: TagIcon,
      }))
    : tags
      ? tags.map((tag) => ({
          label: tag.name,
          value: tag.id,
          description: tag.description,
          icon: TagIcon,
        }))
      : [];

  const handleCreated = async (data: PeripheralTag) => {
    dialogRef.current?.close();
    await utils.peripherals.getAllTags.invalidate();
    setValue(name, [...getValues(name), data.id]);
  };

  const onDialogClose = () => {
    setNewTagName("");
  };

  const handleOnFirstOpen = () => {
    setIsFetchAllowed(true);
  };

  const handleCreateClick = (query: string) => {
    dialogRef.current?.open();
    setNewTagName(query);
  };

  const setIsPending = (isPending: boolean) => {
    dialogRef.current?.setIsPending(isPending);
  };

  const newTagFormData = {
    name: newTagName,
  };

  return (
    <>
      <Dialog
        ref={dialogRef}
        desktopType="modal"
        title="Create a new tag"
        trigger={<div></div>}
        content={
          <CreateForm
            formId={formId}
            data={newTagFormData}
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
      <MultiSelect
        name={name}
        label="Tags"
        labelDescription="(optional)"
        className="max-w-full"
        isFetching={isFetching}
        fetchingFailed={!!error?.message}
        createButtonItemName="tag"
        // editLinkHref={editLinkHref}
        // editLinkItemNamePlural="tags"
        options={options}
        onFirstOpen={handleOnFirstOpen}
        handleCreateClick={handleCreateClick}
      />
    </>
  );
}
