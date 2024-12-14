import {
  createContext,
  use,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { useIsClient, useMediaQuery } from "@uidotdev/usehooks";
import ModalDesktop from "./ModalDesktop";
import DrawerDesktop from "./DrawerDesktop";
import DrawerMobile from "./DrawerMobile";

export type Ref = {
  close: () => void;
};

type DialogContext = Ref;
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
  ref?: RefObject<Ref>;
  title: ReactNode | ((screenType: ScreenType) => ReactNode);
  trigger: ReactNode | ((screenType: ScreenType) => ReactNode);
  content: ReactNode | ((screenType: ScreenType) => ReactNode);
  footer: ReactNode | ((screenType: ScreenType) => ReactNode);
  description?: ReactNode | ((screenType: ScreenType) => ReactNode);
  spinner?: boolean;
  titleClassName?: string;
  titleContainerClassName?: string;
  desktopType: "drawer" | "modal";
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
}: Props) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const internalRef = useRef<Ref>(null);

  const close = useCallback(() => {
    if (!internalRef.current) return;
    internalRef.current.close();
  }, []);

  const dialogContext = useMemo(
    () => ({
      close,
    }),
    [close],
  );

  useImperativeHandle(ref, () => ({
    close,
  }));

  return (
    <DialogContext.Provider value={dialogContext}>
      {isDesktop && desktopType === "modal" ? (
        <ModalDesktop
          ref={internalRef}
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
        />
      ) : isDesktop && desktopType === "drawer" ? (
        <DrawerDesktop
          ref={internalRef}
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
        />
      ) : (
        <DrawerMobile
          ref={internalRef}
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
