import Table from "@/components/Models/Peripherals/Table";
import Count from "@/components/Count";
import Button from "@/components/Button";
import NextLink from "next/link";

export default function Page() {
  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Count icon="hospital-bed" count={11} text="Peripheral(s)" />
        <div>
          <NextLink href="/peripherals/new">
            <Button>Add Peripheral</Button>
          </NextLink>
        </div>
      </div>
      <Table />
    </div>
  );
}
