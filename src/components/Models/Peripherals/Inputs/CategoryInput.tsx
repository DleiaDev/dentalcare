import Dialog, { DialogRef } from "@/components/Dialog";
import SingleSelect from "@/components/Form/SingleSelect";
import { trpc } from "@/trpc/client";
import { useId, useRef, useState } from "react";
import CreateForm from "../../PeripheralCategories/CreateForm";
import { PeripheralCategory } from "@/zod/PeripheralCategory";
import { useFormContext } from "react-hook-form";
import DialogFooter from "@/components/DialogFooter";

type Props = {
  containerClassName?: string;
};

export default function CategoryInput({ containerClassName }: Props) {
  const { setValue } = useFormContext();
  const dialogRef = useRef<DialogRef>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isFetchAllowed, setIsFetchAllowed] = useState(false);

  const formId = useId();

  const utils = trpc.useUtils();

  const {
    data: categories = [],
    error,
    isFetching,
  } = trpc.peripherals.getAllCategories.useQuery(undefined, {
    enabled: isFetchAllowed,
  });

  const handleCreated = (data: PeripheralCategory) => {
    dialogRef.current?.close();
    utils.peripherals.getAllCategories.invalidate();
    setValue("Category", data.id);
  };

  const onDialogClose = () => {
    setNewCategoryName("");
  };

  const handleOnFirstOpen = () => {
    setIsFetchAllowed(true);
  };

  const handleCreateClick = (query: string) => {
    dialogRef.current?.open();
    setNewCategoryName(query);
  };

  const setIsPending = (isPending: boolean) => {
    dialogRef.current?.setIsPending(isPending);
  };

  const newCategoryFormData = {
    name: newCategoryName,
  };

  return (
    <>
      <Dialog
        ref={dialogRef}
        desktopType="modal"
        title="Create a new category"
        trigger={""}
        content={
          <CreateForm
            formId={formId}
            data={newCategoryFormData}
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
        name="Category"
        label="Category"
        labelDescription="(optional)"
        containerClassName={containerClassName}
        isFetching={isFetching}
        fetchingFailed={!!error?.message}
        createButtonItemName="category"
        // editLinkHref={editLinkHref}
        // editLinkItemNamePlural="categories"
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
          description: category.description,
        }))}
        onFirstOpen={handleOnFirstOpen}
        handleCreateClick={handleCreateClick}
      />
    </>
  );
}
