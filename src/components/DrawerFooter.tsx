import { useDrawerContext } from "@/components/Drawer";
import Button from "@/components/Button";

type Props = {
  formId: string;
  nextButtonDisabled: boolean;
  backButtonDisabled: boolean;
  goBackward: () => void;
};

export default function Footer({
  formId,
  nextButtonDisabled,
  backButtonDisabled,
  goBackward,
}: Props) {
  const { close } = useDrawerContext();
  return (
    <div className="flex justify-end gap-6">
      <Button intent="ghost" color="black" size="xl" onClick={close}>
        Cancel
      </Button>
      <Button
        intent="outlined"
        size="xl"
        disabled={backButtonDisabled}
        onClick={goBackward}
      >
        Back
      </Button>
      <Button
        form={formId}
        size="xl"
        type="submit"
        disabled={nextButtonDisabled}
      >
        Next
      </Button>
    </div>
  );
}
