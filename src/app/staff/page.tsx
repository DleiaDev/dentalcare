import Employees from "@/components/Models/Employees/Employees";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/Tabs";

export default function Page() {
  return (
    <div className="animate-in fade-in duration-500">
      <Tabs defaultValue="Doctor Staff">
        <TabsList className="border-b border-b-border gap-10 px-8">
          <TabsTrigger value="Doctor Staff">Doctor Staff</TabsTrigger>
          <TabsTrigger value="General Staff">General Staff</TabsTrigger>
        </TabsList>
        <TabsContent value="Doctor Staff" className="px-8">
          <Employees className="pt-8" />
        </TabsContent>
        <TabsContent value="General Staff" className="px-8">
          <Employees className="pt-8" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
