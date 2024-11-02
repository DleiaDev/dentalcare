"use client";

import { ReactNode } from "react";
import { Drawer } from "vaul";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Cross1Icon } from "@radix-ui/react-icons";

type Props = {
  trigger: ReactNode;
  title: String;
  body: ReactNode;
};

export default function VaulDrawer({ trigger, title, body }: Props) {
  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="right-4 top-8 bottom-8 fixed z-10 outline-none w-2/3 max-w-[50rem] flex"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={
            { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
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
            <div className="flex-1 py-5 px-9">{body}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
