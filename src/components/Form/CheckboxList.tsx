import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import BooleanInput from "./BooleanInput";
import { useWatch } from "react-hook-form";

type Checkbox = {
  label: string;
  name?: string;
  value?: string | number;
};

type Props = {
  title: string;
} & (
  | {
      // Shared array field; a checkbox may still override it with its own `name`.
      name: string;
      checkboxes: Checkbox[];
    }
  | {
      // No shared field, so every checkbox needs its own `name`.
      name?: undefined;
      checkboxes: (Checkbox & { name: string })[];
    }
);

function SelectedCount({
  name,
  checkboxes,
}: {
  name: string;
  checkboxes: Checkbox[];
}) {
  // `useWatch` re-renders only this badge; `watch` from `useFormContext`
  // would re-render the whole form on every toggle.
  const formValue: unknown = useWatch({ name });
  const selected = Array.isArray(formValue) ? formValue : [];

  const selectedCount = checkboxes.filter(
    (checkbox) =>
      (checkbox.name === undefined || checkbox.name === name) &&
      checkbox.value !== undefined &&
      selected.includes(checkbox.value),
  ).length;

  return (
    <div className="bg-gray-400 text-gray-700 text-sm px-3 py-1 rounded-lg">
      {selectedCount} Selected
    </div>
  );
}

export default function CheckboxList({ title, name, checkboxes }: Props) {
  return (
    <Accordion type="single" defaultValue="a" collapsible>
      <AccordionItem value="a">
        <AccordionTrigger>
          <div className="flex items-center gap-4">
            {title}
            {name && <SelectedCount name={name} checkboxes={checkboxes} />}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {checkboxes.map((checkbox) => {
            // The union guarantees one of the two is set.
            const fieldName = (checkbox.name ?? name) as string;
            return (
              <BooleanInput
                key={`${fieldName}:${checkbox.value ?? ""}`}
                name={fieldName}
                label={checkbox.label}
                value={checkbox.value}
                containerClassName="border-b border-b-border last:border-b-0"
                className="p-4 transition-colors hover:bg-accent"
              />
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
