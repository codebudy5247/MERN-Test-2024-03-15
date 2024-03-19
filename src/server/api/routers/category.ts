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
  removeCategory: protectedProcedure
    .input(z.object({ selectedCategoryId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.user === null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized!",
        });
      }
      await ctx.db.userSelectedCategory.delete({
        where: {
          id: input.selectedCategoryId,
        },
      });

      return {
        success: true,
      };
    }),
  userSelectedCategoryList: protectedProcedure.query(async ({ ctx }) => {
    try {
      if (ctx.user.user === null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized!",
        });
      }
      return ctx.db.userSelectedCategory.findMany({
        where: {
          userId: ctx.user.user.id,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong!",
      });
    }
  }),
});
