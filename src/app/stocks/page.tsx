import Treatments from "@/components/Models/Treatments/Treatments";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/Tabs";

export default function Page() {
  return (
    <Tabs defaultValue="Inventory">
      <TabsList className="border-b border-b-border gap-10 px-8">
        <TabsTrigger value="Inventory">Inventory</TabsTrigger>
        <TabsTrigger value="Order Stock">Order Stock</TabsTrigger>
      </TabsList>
      <TabsContent value="Inventory" className="px-8">
        <Treatments className="pt-8" />
      </TabsContent>
      <TabsContent value="Order Stock" className="px-8">
        <Treatments className="pt-8" />
      </TabsContent>
    </Tabs>
  );
}
