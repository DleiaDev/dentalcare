import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

type Props = {
  name?: string;
  deps: RegisterOptions["deps"];
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const UIComponent = forwardRef<HTMLInputElement, Omit<Props, "deps">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="time"
        ref={ref}
        {...props}
        className={cn(
          "w-36 py-1 px-3 flex rounded-md border border-border bg-white font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      />
    );
  },
);
UIComponent.displayName = "UIComponent";

function FormInput({ name, deps, ...props }: Props & { name: string }) {
  const { register } = useFormContext();

  return <UIComponent {...props} {...register(name, { deps })} />;
}

export default function TimeInput({ name, ...props }: Props) {
  return name ? (
    <FormInput {...props} name={name} />
  ) : (
    <UIComponent {...props} />
  );
}
