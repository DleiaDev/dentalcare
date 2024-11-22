import superjson from "superjson";
import { initTRPC } from "@trpc/server";
import { Context, createContext } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
