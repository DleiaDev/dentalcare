import { useDrawerContext } from "@/components/Drawer";
import Button from "@/components/Button";

type Props = {
  formId: string;
  nextButtonText?: string;
  nextButtonDisabled?: boolean;
  backButtonDisabled?: boolean;
  showBackButton?: boolean;
  goBackward?: () => void;
};

export default function Footer({
  formId,
  nextButtonText = "Next",
  nextButtonDisabled,
  backButtonDisabled,
  showBackButton = true,
  goBackward,
}: Props) {
  const { close } = useDrawerContext();
  return (
    <div className="flex justify-end gap-6">
      <Button intent="ghost" color="black" size="xl" onClick={close}>
        Cancel
      </Button>
      {showBackButton && (
        <Button
          intent="outlined"
          size="xl"
          disabled={backButtonDisabled}
          onClick={goBackward}
        >
          Back
        </Button>
      )}
      <Button
        form={formId}
        size="xl"
        type="submit"
        disabled={nextButtonDisabled}
      >
        {nextButtonText}
      </Button>
    </div>
  );
}
