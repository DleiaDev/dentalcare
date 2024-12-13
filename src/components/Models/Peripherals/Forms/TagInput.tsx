import { trpc } from "@/trpc/client";
import MultiSelect from "@/components/Form/MultiSelect";
import TagIcon from "@/icons/tag.svg";
import { useState } from "react";

type Props = {
  editLinkHref?: string;
};

export default function TagInput({ editLinkHref }: Props) {
  const [isFetchAllowed, setIsFetchAllowed] = useState(false);

  const {
    data: tags = [],
    error,
    isFetching,
  } = trpc.peripherals.getAllTags.useQuery(undefined, {
    enabled: isFetchAllowed,
  });

  const handleOnFirstOpen = () => {
    setIsFetchAllowed(true);
  };

  return (
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
    />
  );
}
