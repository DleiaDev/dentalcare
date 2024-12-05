import prisma from "@/lib/prisma";
import { publicProcedure, router } from "../trpc";

export const treatmentsRouter = router({
  getAllCategories: publicProcedure.query(async () => {
    const delay = async (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await delay(3000);
    // throw new Error("Something happened");
    return prisma.treatmentGroup.findMany();
  }),
});
