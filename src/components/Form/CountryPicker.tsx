import { trpc } from "@/trpc/client";
import Select, { type Option, type SelectProps } from "./Select";
import Image from "next/image";

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

type Props = DistributiveOmit<
  SelectProps<Option<string>>,
  "options" | "groups" | "isFetching" | "fetchingFailed"
>;

export default function CountryPicker(props: Props) {
  const {
    data: countries = [],
    isFetching,
    error,
  } = trpc.holidays.getAllCountries.useQuery(undefined, {
    staleTime: Infinity,
  });

  return (
    <Select
      {...props}
      isFetching={isFetching}
      fetchingFailed={!!error?.message}
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
