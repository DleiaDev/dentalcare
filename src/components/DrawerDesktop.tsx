import {
  createContext,
  use,
  useImperativeHandle,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Spinner from "@/icons/Spinner";
import Button from "./Button";

export type Ref = {
  open: () => void;
  close: () => void;
};

type Props = {
  ref?: RefObject<Ref | null>;
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

// Not a technical limit, just a guard against overcomplicated drawers.
const MAX_LEVELS = 5;

// Space between a drawer and the right edge of the screen (same as `right-4`).
const SCREEN_GAP = "1rem";

// How much of a parent drawer stays visible while its child is open.
const PEEK = "5%";

// Horizontal drawer positions, relative to where a drawer sits by the right edge.
// Percentages are of the drawer's own width.
const X_ROOT = "0px";
const X_NESTED = `calc(-${PEEK} - ${SCREEN_GAP})`; // leaves room for the parent's peek
const X_PEEKING = `calc(100% - ${PEEK})`;
const X_OFFSCREEN = `calc(100% + ${SCREEN_GAP})`;

function getTranslateX(level: number, topLevel: number) {
  const levelsAbove = topLevel - level;
  if (levelsAbove === 0) return level === 0 ? X_ROOT : X_NESTED;
  if (levelsAbove === 1) return X_PEEKING;
  return X_OFFSCREEN;
}

// How far a nested drawer moves while fading in and out.
const NESTED_SLIDE = "24%";

// Where a drawer comes from when opening and goes to when closing.
// The root slides in from the screen edge; nested drawers fade in while
// sliding slightly to the right into `translateX`.
function getHiddenState(level: number, translateX: string) {
  if (level === 0) return { x: X_OFFSCREEN, opacity: 1 };
  return { x: `calc(${translateX} - ${NESTED_SLIDE})`, opacity: 0 };
}

// Shared by a root drawer and all of its descendants. `topLevel` is the level
// of the frontmost open drawer, -1 when none is open.
const StackContext = createContext({
  topLevel: -1,
  setTopLevel: (_level: number) => {},
});

function StackProvider({ children }: { children: ReactNode }) {
  const [topLevel, setTopLevel] = useState(-1);
  return (
    <StackContext.Provider value={{ topLevel, setTopLevel }}>
      {children}
    </StackContext.Provider>
  );
}

// Provided by a drawer to everything inside it, so a nested drawer can be
// placed anywhere in the parent's title, content or footer.
const ParentDrawerContext = createContext<{
  level: number;
  isVisible: boolean;
} | null>(null);

function Drawer({
  ref,
  level,
  isParentVisible,
  trigger,
  title,
  content,
  footer,
  spinner,
  titleClassName,
  titleContainerClassName,
  onOpen,
  onClose,
}: Props & { level: number; isParentVisible: boolean }) {
  const { topLevel, setTopLevel } = use(StackContext);
  const [isOpen, setIsOpen] = useState(false);

  function setOpen(open: boolean) {
    if (open === isOpen) return;
    setIsOpen(open);
    setTopLevel(open ? level : level - 1);
    if (open) onOpen?.();
    else onClose?.();
  }

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  // Closing a parent also closes its open children
  const isVisible = isOpen && isParentVisible;

  // A closing drawer stays where it was, so its exit animation starts from there
  const targetX = getTranslateX(level, topLevel);
  const [lastVisibleX, setLastVisibleX] = useState(targetX);
  if (isVisible && lastVisibleX !== targetX) setLastVisibleX(targetX);
  const translateX = isVisible ? targetX : lastVisibleX;
  const hidden = getHiddenState(level, translateX);

  return (
    <DialogPrimitive.Root open={isVisible} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        {/* Only the root backdrop is dimmed. Nested ones are transparent but still close their drawer on click */}
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50",
            level === 0 &&
              "data-[state=open]:animate-modal-overlay-open data-[state=closed]:animate-modal-overlay-exit",
          )}
        />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            "fixed inset-y-0 right-4 z-50 my-auto h-[95%] w-2/3 max-w-[50rem] rounded-xl bg-background",
            // Moving aside for a child drawer
            "transition-transform duration-500 ease-drawer",
            // Opening and closing
            "data-[state=open]:animate-drawer-enter data-[state=closed]:animate-drawer-leave",
          )}
          style={
            {
              transform: `translateX(${translateX})`,
              "--drawer-hidden-x": hidden.x,
              "--drawer-hidden-opacity": hidden.opacity,
            } as CSSProperties
          }
        >
          <ParentDrawerContext.Provider value={{ level, isVisible }}>
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
                <DialogPrimitive.Title
                  className={cn("font-semibold text-lg", titleClassName)}
                >
                  {title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Close asChild>
                  <Button variant="text" color="black">
                    <Cross1Icon className="w-5 h-5" />
                  </Button>
                </DialogPrimitive.Close>
              </div>

              {/* Content */}
              <div className="flex-1 py-5 px-9 overflow-auto">{content}</div>

              {/* Footer */}
              {footer && <div className="py-5 px-9 border-t">{footer}</div>}
            </div>
          </ParentDrawerContext.Provider>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default function DrawerDesktop(props: Props) {
  const parent = use(ParentDrawerContext);

  // A drawer without a parent starts a new stack for itself and its descendants
  if (parent === null) {
    return (
      <StackProvider>
        <Drawer {...props} level={0} isParentVisible />
      </StackProvider>
    );
  }

  const level = parent.level + 1;
  if (level >= MAX_LEVELS)
    throw new Error(`Drawers can't be nested more than ${MAX_LEVELS} levels deep`);

  return <Drawer {...props} level={level} isParentVisible={parent.isVisible} />;
}
