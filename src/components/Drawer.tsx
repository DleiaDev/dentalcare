import {
  ComponentProps,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { Drawer } from "vaul";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Cross1Icon } from "@radix-ui/react-icons";

// Props
type Props = ComponentProps<typeof Drawer.Root> & {
  trigger: ReactNode;
  title: String;
  body: ReactNode;
  footer?: ReactNode;
};

// Context
type Context = { close: () => void };
const DrawerContext = createContext<Context | null>(null);
export const useDrawerContext = () => {
  const currentDrawerContext = useContext(DrawerContext);

  if (!currentDrawerContext) {
    throw new Error(
      "useDrawerContext has to be used within <DrawerContext.Provider>",
    );
  }

  return currentDrawerContext;
};

export default function VaulDrawer({
  trigger,
  title,
  body,
  footer,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const context = {
    close: () => setIsOpen(false),
  };

  return (
    <DrawerContext.Provider value={context}>
      <Drawer.Root
        direction="right"
        {...props}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            className="right-4 top-8 bottom-8 fixed z-10 outline-none w-2/3 max-w-[50rem] flex"
            // The gap between the edge of the screen and the drawer is 8px in this case.
            style={
              {
                "--initial-transform": "calc(100% + 8px)",
              } as React.CSSProperties
            }
          >
            <div className="bg-background h-full w-full grow flex flex-col rounded-[16px]">
              <div className="flex items-center justify-between py-5 px-9 border-b border-b-border">
                <Drawer.Title className="font-semibold text-lg">
                  {title}
                </Drawer.Title>
                <Drawer.Close>
                  <Cross1Icon className="w-5 h-5" />
                </Drawer.Close>
              </div>
              <VisuallyHidden.Root>
                <Drawer.Description>{title}</Drawer.Description>
              </VisuallyHidden.Root>
              <div className="flex-1 py-5 px-9 overflow-auto">{body}</div>
              {footer && (
                <div className="py-5 px-9 border-t border-t-border">
                  {footer}
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </DrawerContext.Provider>
  );
}
