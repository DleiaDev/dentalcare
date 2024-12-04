import Treatments from "@/components/Models/Treatments/Treatments";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/Tabs";

export default function Page() {
  return (
    <Tabs defaultValue="Active Treatments">
      <TabsList className="border-b border-b-border gap-10 px-8">
        <TabsTrigger value="Active Treatments">Active Treatments</TabsTrigger>
        <TabsTrigger value="Inactive Treatments">
          Inactive Treatments
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Active Treatments" className="px-8">
        <Treatments className="pt-8" />
      </TabsContent>
      <TabsContent value="Inactive Treatments" className="px-8">
        <Treatments className="pt-8" />
      </TabsContent>
    </Tabs>
  );
}
