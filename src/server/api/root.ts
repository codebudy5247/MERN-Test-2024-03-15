import { postRouter } from "~/server/api/routers/post";
import { authRouter } from "./routers/auth";
import { categoryRouter } from "./routers/category";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth:authRouter,
  category:categoryRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
