import { router } from "../trpc";
import { holidaysRouter } from "./holidays";
import { treatmentsRouter } from "./treatments";

export const appRouter = router({
  holidays: holidaysRouter,
  treatments: treatmentsRouter,
});

export type AppRouter = typeof appRouter;
