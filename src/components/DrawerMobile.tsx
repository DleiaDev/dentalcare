import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode, RefObject, useImperativeHandle, useState } from "react";
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

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="h-full relative">
          {/* Spinner */}
          {spinner ? (
            <div className="bg-white/50 absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center animate-in fade-in rounded-xl">
              <Spinner className="text-primary w-16 h-16" />
            </div>
          ) : null}

          {/* Header */}
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>

          {/* Content */}
          {content}

          {/* Footer */}
          {footer && <DrawerFooter className="pt-2">{footer}</DrawerFooter>}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
