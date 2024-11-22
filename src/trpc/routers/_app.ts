import { router } from "../trpc";
import { holidaysRouter } from "./holidays";

export const appRouter = router({
  holidays: holidaysRouter,
});

export type AppRouter = typeof appRouter;
