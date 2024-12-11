import { trpc } from "@/trpc/client";
import MultiSelect from "@/components/Form/MultiSelect";
import TagIcon from "@/icons/tag.svg";
import { useState } from "react";

export default function TagInput() {
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
      options={tags.map((tag) => ({
        label: tag.name,
        value: tag.id,
        icon: TagIcon,
      }))}
      onFirstOpen={handleOnFirstOpen}
    />
  );
}
