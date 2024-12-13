import { type ReactNode, type RefObject } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import ModalDesktop from "./ModalDesktop";
import DrawerDesktop from "./DrawerDesktop";
import DrawerMobile from "./DrawerMobile";

export type Ref = {
  closeModal: () => void;
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

export default function Dialog({
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
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop && desktopType === "modal")
    return (
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
      />
    );

  if (isDesktop && desktopType === "drawer") {
    return (
      <DrawerDesktop
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
    );
  }

  return (
    <DrawerMobile
      ref={ref}
      title={typeof title === "function" ? title("desktop") : title}
      trigger={typeof trigger === "function" ? trigger("desktop") : trigger}
      content={typeof content === "function" ? content("desktop") : content}
      footer={typeof footer === "function" ? footer("desktop") : footer}
      description={
        typeof description === "function" ? description("desktop") : description
      }
      spinner={spinner}
      titleClassName={titleClassName}
      titleContainerClassName={titleContainerClassName}
    />
  );
}
