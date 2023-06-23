import { z } from "zod"
import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc"
import { orderItemSchema } from "~/types/schema"

export const orderItemRouter = createTRPCRouter({
  // Queries
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
  getbyId: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input: { id } }) => {
      return await ctx.prisma.orderItem.findUnique({
        where: { id },
        include: { product: true }
      })
    }),
  // Mutations
  update: protectedProcedure
    .input(orderItemSchema)
    .mutation(async ({ ctx, input: { id, productId, quantity, description } }) => {
      try {
        return await ctx.prisma.orderItem.update({
          where: { id },
          data: {
            productId,
            quantity,
            description
          }
        })
      } catch (err) {
        console.error(err)
      }
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