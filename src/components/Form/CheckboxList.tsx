import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Checkbox from "./Checkbox";
import { useFormContext } from "react-hook-form";

type Props = {
  title: string;
} & (
  | {
      name?: string;
      checkboxes: {
        label: string;
        name: string;
        value?: string | number;
      }[];
    }
  | {
      name: string;
      checkboxes: {
        label: string;
        name?: string;
        value?: string | number;
      }[];
    }
);

function SelectedCount({
  name,
  checkboxes,
}: {
  name: string;
  checkboxes: Props["checkboxes"];
}) {
  const { watch } = useFormContext();

  const formValue = watch(name);
  const selectedCount = checkboxes.reduce(
    (acc, checkbox) => (formValue.includes(checkbox.value) ? acc + 1 : acc),
    0,
  );

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
          {checkboxes.map((checkbox) => (
            <Checkbox
              key={checkbox.label}
              name={(checkbox.name ?? name) as string}
              label={checkbox.label}
              value={checkbox.value}
              className="p-4 border-b border-b-border transition-colors last:border-b-0 hover:bg-accent"
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
