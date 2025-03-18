import H3 from "@/components/H3";
import Form from "@/components/Models/Peripherals/Form";
import { getClinic } from "@/lib/clinic_dev";
import prisma from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const clinic = getClinic();

  const id = (await params).id;
  const peripheral = await prisma.peripheral.findFirst({
    where: { id },
    include: {
      Vendor: true,
      Category: true,
      Status: true,
      Tags: true,
      Attachments: true,
    },
  });

  return (
    <div className="p-8 animate-in fade-in duration-500">
      {peripheral !== null ? (
        <Form peripheral={peripheral} clinicId={clinic.id} />
      ) : (
        <H3 className="text-center">Peripheral not found</H3>
      )}
    </div>
  );
}
