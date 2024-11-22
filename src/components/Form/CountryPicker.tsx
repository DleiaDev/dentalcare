import { trpc } from "@/trpc/client";
import Select from "./Select";
import Image from "next/image";
import { ComponentProps } from "react";

type Props = Pick<
  ComponentProps<typeof Select>,
  | "name"
  | "className"
  | "containerClassName"
  | "label"
  | "placeholder"
  | "onValueChange"
>;

export default function CountryPicker({
  name,
  className,
  containerClassName,
  onValueChange,
}: Props) {
  const {
    data: countries = [],
    isFetching,
    error,
  } = trpc.holidays.getAllCountries.useQuery(undefined, {
    staleTime: Infinity,
  });

  return (
    <Select
      name={name}
      className={className}
      containerClassName={containerClassName}
      isFetching={isFetching}
      fetchingFailed={!!error?.message}
      onValueChange={onValueChange}
      options={countries.map((country) => ({
        value: country.code,
        label: (
          <div className="flex items-center gap-3">
            <Image
              src={country.flag}
              alt={country.name}
              width={36}
              height={24}
              className="w-9 h-6"
            />
            <div>{country.name}</div>
          </div>
        ),
      }))}
    />
  );
}
