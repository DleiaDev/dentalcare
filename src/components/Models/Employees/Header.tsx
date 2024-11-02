"use client";

import Count from "@/components/Count";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import Create from "./Create/Create";

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <Count icon="stethoscope" count={8} text="Doctor(s)" />
      <div>
        <Drawer
          trigger={<Button>Add Doctor</Button>}
          title="Add new doctor staff"
          body={<Create />}
        />
      </div>
    </div>
  );
}
