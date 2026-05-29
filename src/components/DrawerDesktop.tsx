import React, {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import ReactModal from "react-modal";
import { Cross1Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Button from "./Button";
import Spinner from "@/icons/Spinner";

ReactModal.setAppElement("#drawers-container");

export type Ref = {
  open: () => void;
  close: (ignoreSpinner: boolean) => void;
};

type Props = {
  ref?: RefObject<Ref>;
  title: ReactNode;
  trigger: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  spinner?: boolean;
  titleClassName?: string;
  titleContainerClassName?: string;
  onOpen?: () => void;
  onClose?: () => void;
};

type TriggerProps = {
  onClick: () => void;
};

// Level context
const LevelContext = createContext(0);

// Total opened context
const TotalOpenedContext = createContext<{
  totalOpened: number;
  setTotalOpened: (setFunc: (totalOpened: number) => number) => void;
}>({
  totalOpened: 0,
  setTotalOpened: () => {},
});

// Opening level context
const OpeningLevelContext = createContext<{
  openingLevel?: number;
  setOpeningLevel: (openingLevel?: number) => void;
}>({
  openingLevel: 0,
  setOpeningLevel: () => {},
});

// Closing level context
const ClosingLevelContext = createContext<{
  closingLevel?: number;
  setClosingLevel: (closingLevel?: number) => void;
}>({
  closingLevel: 0,
  setClosingLevel: () => {},
});

const Providers = ({ children }: { children: ReactNode }) => {
  const [totalOpened, setTotalOpened] = useState(0);
  const [openingLevel, setOpeningLevel] = useState<number | undefined>();
  const [closingLevel, setClosingLevel] = useState<number | undefined>();
  return (
    <TotalOpenedContext.Provider value={{ totalOpened, setTotalOpened }}>
      <OpeningLevelContext.Provider value={{ openingLevel, setOpeningLevel }}>
        <ClosingLevelContext.Provider value={{ closingLevel, setClosingLevel }}>
          {children}
        </ClosingLevelContext.Provider>
      </OpeningLevelContext.Provider>
    </TotalOpenedContext.Provider>
  );
};

function Component({
  ref,
  trigger,
  title,
  content,
  footer,
  level,
  spinner,
  titleClassName,
  titleContainerClassName,
  onOpen,
  onClose,
}: Props & { level: number }) {
  const { openingLevel, setOpeningLevel } = useContext(OpeningLevelContext);
  const { closingLevel, setClosingLevel } = useContext(ClosingLevelContext);
  const { totalOpened, setTotalOpened } = useContext(TotalOpenedContext);

  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
    setOpeningLevel(level);
    setClosingLevel(undefined);
    setTotalOpened((totalOpened) => totalOpened + 1);
    if (isOpen === false && onOpen) onOpen();
  }

  function close(ignoreSpinner = false) {
    if (spinner && !ignoreSpinner) return;
    setIsOpen(false);
    setOpeningLevel(undefined);
    setClosingLevel(level);
    setTotalOpened((totalOpened) => totalOpened - 1);
    if (isOpen === true && onClose) onClose();
  }

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  let animationName = undefined;
  const isOpening = openingLevel === level;
  const isClosing = closingLevel === level;
  if (isOpening && level === 0) animationName = "modal-first-open";
  else if (isOpening && level > 0) animationName = "modal-nested-open";
  else if (isClosing && level === 0) animationName = "modal-first-close";
  else if (isClosing && level > 0) animationName = "modal-nested-close";

  let translateXPercentage = 0;
  if (level === 0 && totalOpened === 1) translateXPercentage = 0;
  else if (level < totalOpened - 1)
    translateXPercentage = (totalOpened - level - 1) * 75;
  else if (level === totalOpened - 1) translateXPercentage = -26;

  const animation = `${animationName} 500ms cubic-bezier(0.32,0.72,0,1)`;
  const transform = `translateX(${translateXPercentage}%)`;

  if (React.Children.count(trigger) > 1)
    throw new Error("Only one child trigger is allowed");

  let triggerComponent = undefined;
  if (React.isValidElement<TriggerProps>(trigger))
    triggerComponent = React.cloneElement(trigger, { onClick: open });

  return (
    <>
      {triggerComponent}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => close()}
        closeTimeoutMS={500}
        overlayClassName={{
          base: cn(
            "z-50 fixed top-0 left-0 w-full max-w-full h-full max-h-full animate-modal-overlay-open",
            level > 0 && "bg-transparent!",
          ),
          afterOpen: "",
          beforeClose: "animate-modal-overlay-exit!",
        }}
        className={{
          base: cn(
            "absolute h-[95%] w-2/3 max-w-[50rem] right-4 top-0 bottom-0 my-auto rounded-xl bg-background",
          ),
          beforeClose: "",
          afterOpen: "",
        }}
        style={{
          content: {
            transform,
            animation,
            transition:
              "transform 500ms cubic-bezier(0.32,0.72,0,1), opacity 500ms cubic-bezier(0.32,0.72,0,1)",
          },
        }}
      >
        <div className="h-full flex flex-col relative">
          {/* Spinner */}
          {spinner ? (
            <div className="bg-white/50 absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center animate-in fade-in rounded-xl">
              <Spinner className="text-primary w-16 h-16" />
            </div>
          ) : null}

          {/* Title */}
          <div
            className={cn(
              "flex items-center justify-between py-5 px-9 border-b border-b-border",
              titleContainerClassName,
            )}
          >
            <div className={cn("font-semibold text-lg", titleClassName)}>
              {title}
            </div>
            <Button
              variant="text"
              color="black"
              autoFocus
              onClick={() => close()}
            >
              <Cross1Icon className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 py-5 px-9 overflow-auto">{content}</div>

          {/* Footer */}
          {footer && <div className="py-5 px-9 border-t">{footer}</div>}
        </div>
      </ReactModal>
    </>
  );
}

export default function DrawerDesktop(props: Props) {
  const level = useContext(LevelContext);

  return (
    <LevelContext.Provider value={level + 1}>
      {level === 0 ? (
        <Providers>
          <Component {...props} level={level} />
        </Providers>
      ) : (
        <Component {...props} level={level} />
      )}
    </LevelContext.Provider>
  );
}
