import {
  createContext,
  use,
  useMemo,
  type ReactNode,
  type RefObject,
} from "react";
import { useIsClient, useMediaQuery } from "@uidotdev/usehooks";
import ModalDesktop from "./ModalDesktop";
import DrawerDesktop from "./DrawerDesktop";
import DrawerMobile from "./DrawerMobile";

export type DialogRef = {
  open: () => void;
  close: () => void;
};

type DialogContext = {
  open: DialogRef["open"];
  close: DialogRef["close"];
  isPending: boolean;
};
const DialogContext = createContext<DialogContext | null>(null);
export const useDialogContext = () => {
  const dialogContext = use(DialogContext);
  if (!dialogContext)
    throw new Error(
      "useDialogContext has to be used within <DialogContext></DialogContext>",
    );
  return dialogContext;
};

type ScreenType = "mobile" | "desktop";

type Props = {
  ref?: RefObject<DialogRef | null>;
  title: ReactNode | ((screenType: ScreenType) => ReactNode);
  trigger: ReactNode | ((screenType: ScreenType) => ReactNode);
  content: ReactNode | ((screenType: ScreenType) => ReactNode);
  footer: ReactNode | ((screenType: ScreenType) => ReactNode);
  description?: ReactNode | ((screenType: ScreenType) => ReactNode);
  spinner?: boolean;
  titleClassName?: string;
  titleContainerClassName?: string;
  desktopType: "drawer" | "modal";
  onOpen?: () => void;
  onClose?: () => void;
};

function DialogComponent({
  ref,
  title,
  trigger,
  content,
  footer,
  description,
  spinner,
  titleClassName,
  titleContainerClassName,
  desktopType,
  onOpen,
  onClose,
}: Props) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const dialogContext = useMemo(
    () => ({
      close: () => ref?.current?.close(),
      open: () => ref?.current?.open(),
      isPending: spinner ?? false,
    }),
    [spinner, ref],
  );

  return (
    <DialogContext.Provider value={dialogContext}>
      {isDesktop && desktopType === "modal" ? (
        <ModalDesktop
          ref={ref}
          title={typeof title === "function" ? title("desktop") : title}
          trigger={typeof trigger === "function" ? trigger("desktop") : trigger}
          content={typeof content === "function" ? content("desktop") : content}
          footer={typeof footer === "function" ? footer("desktop") : footer}
          description={
            typeof description === "function"
              ? description("desktop")
              : description
          }
          spinner={spinner}
          titleClassName={titleClassName}
          titleContainerClassName={titleContainerClassName}
          onOpen={onOpen}
          onClose={onClose}
        />
      ) : isDesktop && desktopType === "drawer" ? (
        <DrawerDesktop
          ref={ref}
          title={typeof title === "function" ? title("desktop") : title}
          trigger={typeof trigger === "function" ? trigger("desktop") : trigger}
          content={typeof content === "function" ? content("desktop") : content}
          footer={typeof footer === "function" ? footer("desktop") : footer}
          // description={
          //   typeof description === "function"
          //     ? description("desktop")
          //     : description
          // }
          spinner={spinner}
          titleClassName={titleClassName}
          titleContainerClassName={titleContainerClassName}
          onOpen={onOpen}
          onClose={onClose}
        />
      ) : (
        <DrawerMobile
          ref={ref}
          title={typeof title === "function" ? title("desktop") : title}
          trigger={typeof trigger === "function" ? trigger("desktop") : trigger}
          content={typeof content === "function" ? content("desktop") : content}
          footer={typeof footer === "function" ? footer("desktop") : footer}
          description={
            typeof description === "function"
              ? description("desktop")
              : description
          }
          spinner={spinner}
          titleClassName={titleClassName}
          titleContainerClassName={titleContainerClassName}
          onOpen={onOpen}
          onClose={onClose}
        />
      )}
    </DialogContext.Provider>
  );
}

export default function Dialog(props: Props) {
  const isClient = useIsClient();

  if (isClient === false) {
    return null;
  }

  return <DialogComponent {...props} />;
}
