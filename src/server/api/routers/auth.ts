import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import sendMail from "~/utils/send-mail";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";

const otp = Math.floor(100000 + Math.random() * 900000).toString();

export const authRouter = createTRPCRouter({
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
        { sub: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: 60 * 60,
        },
      );
      const cookieOptions = {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60,
      };
      cookies().set("token", token, cookieOptions);
      return {
        user,
        token,
      };
    }),

  verifyEmail: publicProcedure
    .input(
      z.object({
        email: z.string({ required_error: "Email is required" }).email(),
        verificationCode: z
          .string({ required_error: "Verification Code is required" })
          .min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let user = await ctx.db.user.findFirst({ where: { email: input.email } });
      if (!user) throw Error("User not found");
      console.log(user.emailVerificationCode, otp, "from trpc.....");
      if (user.emailVerificationCode !== input.verificationCode)
        throw Error("Invalid OTP");

      // Update isEmailVerified to true && emailVerificationCode = null
      const updatedUser = await ctx.db.user.update({
        where: {
          id: user.id,
        },
        data: {
          isEmailVerified: true,
          emailVerificationCode: null,
        },
      });
      return updatedUser;
    }),
  me: protectedProcedure.query(({ ctx }) => {
    try {
      return ctx.user;
    } catch (err: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
  }),
});
