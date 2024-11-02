import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Errors({ children }: Props) {
  return <div className="font-semibold text-error text-sm">{children}</div>;
}
