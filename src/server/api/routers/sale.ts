import { StatusSaleOrder } from "@prisma/client"
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
      include: { company: true, personInCharge: true, user: true, orderItems: { include: { product: true } } },
      orderBy: { updatedAt: "desc" }
    })
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input: { id } }) => {
      return await ctx.prisma.saleOrder.findUnique({
        where: { id },
        include: { company: true, user: true, orderItems: true }
      })
    }),

  // Mutations
  create: protectedProcedure
    .input(createSaleSchema)
    .mutation(async ({ ctx, input: {
      orderNumber,
      dateOrdered,
      companyId,
      personInChargeId,
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
            personInChargeId,
            userId,
            status,
            orderItems: {
              createMany: {
                data: orderItems
              }
            }
          },
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
        dateOrdered,
        companyId,
        personInChargeId,
        userId,
      }
    }) => {
      try {

        return await ctx.prisma.saleOrder.update({
          where: { id },
          data: {
            dateOrdered,
            companyId,
            personInChargeId,
            userId,
          }
        })
      } catch (err) {
        console.error(err)
      }
    }),
  updateStatus: protectedProcedure
    .input(z.object({
      id: z.string().cuid(),
      status: z.nativeEnum(StatusSaleOrder)
    }))
    .mutation(async ({ ctx, input: { id, status } }) => {
      try {
        return await ctx.prisma.saleOrder.update({
          where: { id },
          data: { status }
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
