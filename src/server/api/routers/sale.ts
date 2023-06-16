import { StatusSaleOrder } from "@prisma/client"
import { z } from "zod"
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc"

export const saleRouter = createTRPCRouter({

  // Queries
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.saleOrder.findMany({
      include: { company: true, orderItems: true, user: true },
      orderBy: { updatedAt: "desc" }
    })
  }),

  // Mutations
  create: protectedProcedure
    .input(z.object({
      orderNumber: z.string(),
      dateOrdered: z.date(),
      companyId: z.string().cuid(),
      status: z.nativeEnum(StatusSaleOrder),
      userId: z.string().cuid(),
      totalPrice: z.number(),
      orderItems: z.array(
        z.object({
          quantity: z.number(),
          description: z.string(),
          productId: z.string().cuid(),
          saleOrderId: z.string().cuid()
        })
      )
    }))
    .mutation(async ({ ctx, input: {
      orderNumber,
      dateOrdered,
      companyId,
      userId,
      status,
      totalPrice,
      orderItems,
    } }) => {
      try {
        return await ctx.prisma.saleOrder.create({
          data: {
            orderNumber,
            dateOrdered,
            companyId,
            userId,
            status,
            totalPrice,
            orderItems: {
              createMany: {
                data: orderItems
              }
            }
          }
        })
      } catch (err) {
        console.error(err)
      }
    }),
  deleteQuotation: protectedProcedure
    .input(z.object({
      id: z.string().cuid()
    }))
    .mutation(async ({ ctx, input: { id } }) => {
      try {
        return await ctx.prisma.saleOrder.delete({
          where: { id }
        })
      } catch (err) {
        console.error(err)
      }
    })
})
