import Dialog, { DialogRef } from "@/components/Dialog";
import SingleSelect from "@/components/Form/SingleSelect";
import { trpc } from "@/trpc/client";
import { useId, useRef, useState } from "react";
import CreateForm from "../../PeripheralCategories/CreateForm";
import { useFormContext } from "react-hook-form";
import DialogFooter from "@/components/DialogFooter";
import { PeripheralCategory } from "@prisma/zod/modelSchema/PeripheralCategorySchema";

type Props = {
  containerClassName?: string;
  category?: PeripheralCategory | null;
};

function getOptions(categories: PeripheralCategory[]) {
  return categories.map((category) => ({
    value: category.id,
    label: category.name,
    description: category.description,
  }));
}

export default function CategoryInput({ containerClassName, category }: Props) {
  const name = "categoryId";
  const { setValue } = useFormContext();
  const dialogRef = useRef<DialogRef>(null);
  const [isPending, setIsPending] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isFetchAllowed, setIsFetchAllowed] = useState(false);

  const formId = useId();

  const utils = trpc.useUtils();

  const {
    data: categories,
    error,
    isFetching,
  } = trpc.peripherals.getAllCategories.useQuery(undefined, {
    enabled: isFetchAllowed,
  });

  const options = categories
    ? getOptions(categories)
    : category
      ? getOptions([category])
      : [];

  const handleCreated = (data: PeripheralCategory) => {
    dialogRef.current?.close();
    utils.peripherals.getAllCategories.invalidate();
    setValue(name, data.id);
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

  const newCategoryFormData = {
    name: newCategoryName,
  };

  return (
    <>
      <Dialog
        ref={dialogRef}
        desktopType="modal"
        title="Create a new category"
        spinner={isPending}
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
        name={name}
        label="Category"
        labelDescription="(optional)"
        containerClassName={containerClassName}
        isFetching={isFetching}
        fetchingFailed={!!error?.message}
        createButtonItemName="category"
        // editLinkHref={editLinkHref}
        // editLinkItemNamePlural="categories"
        options={options}
        onFirstOpen={handleOnFirstOpen}
        handleCreateClick={handleCreateClick}
      />
    </>
  );
}
