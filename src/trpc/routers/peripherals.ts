import prisma from "@/lib/prisma";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const peripheralsRouter = router({
  find: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async (opts) => {
      return prisma.peripheral.findFirst({ where: { id: opts.input.id } });
    }),
  getAllTags: publicProcedure.query(async () => {
    return prisma.peripheralTag.findMany();
  }),
  getAllStatuses: publicProcedure.query(async () => {
    return prisma.peripheralStatus.findMany();
  }),
  getAllCategories: publicProcedure.query(async () => {
    return prisma.peripheralCategory.findMany();
  }),
  getAllVendors: publicProcedure.query(async () => {
    return prisma.peripheralVendor.findMany();
  }),
});
