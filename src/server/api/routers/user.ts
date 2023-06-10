import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc"

export const userRouter = createTRPCRouter({
  me: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id }
      })
    })
})
