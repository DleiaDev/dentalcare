"use client";

import Count from "@/components/Count";
import Drawer from "./CreateDrawer/Drawer";

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <Count icon="stethoscope" count={8} text="Doctor(s)" />
      <div>
        <Drawer />
      </div>
    </div>
  );
}
