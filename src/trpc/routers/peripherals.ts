import prisma from "@/lib/prisma";
import { publicProcedure, router } from "../trpc";

export const peripheralsRouter = router({
  getAllTags: publicProcedure.query(async () => {
    return prisma.peripheralTag.findMany();
  }),
});
