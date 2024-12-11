import { router } from "../trpc";
import { holidaysRouter } from "./holidays";
import { peripheralsRouter } from "./peripherals";
import { treatmentsRouter } from "./treatments";

export const appRouter = router({
  holidays: holidaysRouter,
  treatments: treatmentsRouter,
  peripherals: peripheralsRouter,
});

export type AppRouter = typeof appRouter;
