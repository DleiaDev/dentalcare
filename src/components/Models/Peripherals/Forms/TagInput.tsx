import { trpc } from "@/trpc/client";
import MultiSelect from "@/components/Form/MultiSelect";
import TagIcon from "@/icons/tag.svg";
import { useId, useRef, useState } from "react";
import Dialog, { type DialogRef } from "@/components/Dialog";
import DialogFooter from "@/components/DialogFooter";
import CreateForm from "@/components/Models/PeripheralTags/CreateForm";
import { CreatePeripheralTagFormData } from "@/zod/PeripheralTag";
import { createPeripheralTag } from "@/actions/PeripheralTag";

type Props = {
  editLinkHref?: string;
};

export default function TagInput({ editLinkHref }: Props) {
  const dialogRef = useRef<DialogRef>(null);
  const [newTagName, setNewTagName] = useState("");
  const [isFetchAllowed, setIsFetchAllowed] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const formId = useId();

  const {
    data: tags = [],
    error,
    isFetching,
  } = trpc.peripherals.getAllTags.useQuery(undefined, {
    enabled: isFetchAllowed,
  });

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

  const newTagFormData = {
    name: newTagName,
  };

  const handleCreateTag = (data: CreatePeripheralTagFormData) => {
    setIsPending(true);
    createPeripheralTag(data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsPending(false);
      });
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
            onFinish={handleCreateTag}
          />
        }
        footer={
          <DialogFooter
            formId={formId}
            showBackButton={false}
            nextButtonText="Save"
          />
        }
        spinner={isPending}
        onClose={onDialogClose}
      />
      <MultiSelect
        name="Tags"
        label="Tags"
        className="max-w-full"
        placeholder="Select a tag"
        isFetching={isFetching}
        fetchingFailed={!!error?.message}
        createButtonItemName="tag"
        editLinkHref={editLinkHref}
        editLinkItemNamePlural="tags"
        options={tags.map((tag) => ({
          label: tag.name,
          value: tag.id,
          icon: TagIcon,
        }))}
        onFirstOpen={handleOnFirstOpen}
        handleCreateClick={handleCreateClick}
      />
    </>
  );
}
