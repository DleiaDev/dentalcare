import { PropsWithChildren } from "react";

export default function SectionTitle({ children }: PropsWithChildren) {
  return <h4 className="mb-7 font-bold text-lg">{children}</h4>;
}
