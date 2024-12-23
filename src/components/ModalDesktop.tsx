import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  ReactNode,
  RefObject,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import Button from "./Button";
import { Cross1Icon } from "@radix-ui/react-icons";
import Spinner from "@/icons/Spinner";

type Ref = {
  open: () => void;
  close: (ignoreSpinner: boolean) => void;
};

type Props = {
  ref?: RefObject<Ref>;
  title: ReactNode;
  trigger: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  description?: ReactNode;
  spinner?: boolean;
  titleClassName?: string;
  titleContainerClassName?: string;
  onOpen?: () => void;
  onClose?: () => void;
};

export default function ModalDesktop({
  ref,
  title,
  trigger,
  content,
  footer,
  description,
  spinner,
  titleClassName,
  titleContainerClassName,
  onOpen,
  onClose,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
    if (isOpen === false && onOpen) onOpen();
  };

  const close = (ignoreSpinner = false) => {
    if (spinner && !ignoreSpinner) return;
    setIsOpen(false);
    if (isOpen === true && onClose) onClose();
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  const handleOpenChange = (value: boolean) => {
    setIsOpen(value);
    if (isOpen === false && value === true && onOpen) onOpen();
    else if (isOpen === true && value === false && onClose) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <div className="h-full relative">
          {/* Spinner */}
          {spinner ? (
            <div className="bg-white/50 absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center animate-in fade-in rounded-xl">
              <Spinner className="text-primary w-16 h-16" />
            </div>
          ) : null}

          {/* Header */}
          <DialogHeader
            className={cn(
              "py-5 px-9 border-b border-b-border",
              titleContainerClassName,
            )}
          >
            <div className="flex items-center justify-between">
              <DialogTitle
                className={cn("font-semibold text-lg", titleClassName)}
              >
                {title}
              </DialogTitle>
              <Button
                intent="text"
                color="black"
                autoFocus
                onClick={() => close()}
              >
                <Cross1Icon className="w-5 h-5" />
              </Button>
            </div>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {/* Content */}
          <div className="py-5 px-9">{content}</div>

          {/* Footer */}
          {footer && (
            <div className="py-5 px-9 border-t border-t-border">{footer}</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
