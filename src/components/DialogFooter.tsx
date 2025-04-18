import { useDialogContext } from "@/components/Dialog";
import Button from "@/components/Button";

type Props = {
  formId: string;
  nextButtonText?: string;
  nextButtonDisabled?: boolean;
  backButtonDisabled?: boolean;
  showBackButton?: boolean;
  goBackward?: () => void;
};

export default function DialogFooter({
  formId,
  nextButtonText = "Next",
  nextButtonDisabled,
  backButtonDisabled,
  showBackButton = true,
  goBackward,
}: Props) {
  const { close, isPending } = useDialogContext();
  return (
    <div className="flex justify-end gap-6">
      <Button variant="ghost" color="black" size="xl" onClick={close}>
        Cancel
      </Button>
      {showBackButton && (
        <Button
          variant="outline"
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
        disabled={nextButtonDisabled || isPending}
      >
        {nextButtonText}
      </Button>
    </div>
  );
}
