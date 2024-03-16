import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import sendMail from "~/utils/send-mail";

const otp = Math.floor(100000 + Math.random() * 900000).toString();

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
      if (user) throw Error("User already exists");
      user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashSync(input.password, 10),
          emailVerificationCode: otp,
        },
      });
      try {
        await sendMail({
          email: user.email,
          subject: "Verify your email.",
          message: `Hello ${user.name}, your verification code is: ${user.emailVerificationCode}`,
        });
      } catch (error) {
        console.log(error);
      }
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
      let user = await ctx.db.user.findFirst({ where: { email: input.email } });
      if (!user) throw Error("User not found");
      if (!compareSync(input.password, user.password))
        throw Error("Incorrect password");
      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET as string,
      );
      return {
        user,
        token,
      };
    }),

  verifyEmail: publicProcedure
    .input(
      z.object({
        verificationCode: z
          .string({ required_error: "Verification Code is required" })
          .min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
        
    }),
});
