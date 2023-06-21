import { z } from "zod"
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc"
import { createSaleSchema, updateSaleSchema } from "~/types/schema"

export const saleRouter = createTRPCRouter({

  // Queries
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.saleOrder.findMany({
      include: { company: true, user: true, orderItems: { include: { product: true } } },
      orderBy: { updatedAt: "desc" }
    })
  }),

  // Mutations
  create: protectedProcedure
    .input(createSaleSchema)
    .mutation(async ({ ctx, input: {
      orderNumber,
      dateOrdered,
      companyId,
      userId,
      status,
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
  update: protectedProcedure
    .input(updateSaleSchema)
    .mutation(async ({
      ctx,
      input: {
        id,
        orderNumber,
        dateOrdered,
        companyId,
        userId,
        orderItems
      }
    }) => {
      try {
        return await ctx.prisma.saleOrder.update({
          where: { id },
          data: {
            orderNumber,
            dateOrdered,
            companyId,
            userId,
            orderItems: {
              updateMany: {
                where: {
                  saleOrderId: {
                    contains: id
                  }
                },
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
