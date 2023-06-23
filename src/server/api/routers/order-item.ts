import { z } from "zod"
import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc"

export const orderItemRouter = createTRPCRouter({
  getAllOrderItemBySaleId: protectedProcedure
    .input(z.object({
      saleOrderId: z.string().cuid()
    }))
    .query(async ({ ctx, input: { saleOrderId } }) => {
      return await ctx.prisma.orderItem.findMany({
        where: { saleOrderId },
        include: { product: true, saleOrder: { select: { orderNumber: true, status: true } } }
      })
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input: { id } }) => {
      try {
        return await ctx.prisma.orderItem.delete({
          where: { id }
        })
      } catch (err) {
        console.error(err)
      }
    })
})