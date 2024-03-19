import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany();
  }),
  selectCategory: protectedProcedure
    .input(z.object({ categoryId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.user === null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized!",
        });
      }
      const newSelectedItem = await ctx.db.userSelectedCategory.create({
        data: {
          userId: ctx.user.user?.id as string,
          categoryId: input.categoryId,
        },
      });

      return { newSelectedItem };
    }),
});
