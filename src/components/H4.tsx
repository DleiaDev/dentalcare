import { PropsWithChildren } from "react";

export default function H4({ children }: PropsWithChildren) {
  return <h4 className="text-xl font-bold">{children}</h4>;
}
