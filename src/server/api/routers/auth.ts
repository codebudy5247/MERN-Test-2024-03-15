import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";

export const authRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  register: publicProcedure
    .input(
      z.object({
        name: z.string({ required_error: "Name is required" }).min(1),
        email: z.string({ required_error: "Email is required" }).email(),
        password: z.string({ required_error: "Password is required" }).min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let user = await ctx.db.user.findFirst({ where: { email: input.email } });
      if (user) throw Error("User already exists")
      user = await ctx.db.user.create({
        data:  {
            name: input.name,
            email: input.email,
            password: hashSync(input.password, 10),
          },
      });
      return user;
    }),

    login: publicProcedure
    .input(
      z.object({
        email: z.string({ required_error: "Email is required" }).email(),
        password: z.string({ required_error: "Password is required" }).min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      
    }),
});
