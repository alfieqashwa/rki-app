import { Category, UomType } from "@prisma/client"
import { z } from "zod"
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc"

export const productRouter = createTRPCRouter({
  // Queries
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.product.findMany()
    }),
  // Mutations
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(3, {
        message: "at least have 3 characters"
      }).max(20),
      category: z.nativeEnum(Category, {
        errorMap: (issue, _ctx) => {
          switch (issue.code) {
            case 'invalid_type':
              return { message: "Please select one of the options" }
            case "invalid_enum_value":
              return { message: "Invalid value." }
            default:
              return { message: "This is a mandatory fields" }
          }
        },
      }),
      uom: z.nativeEnum(UomType, {
        errorMap: (issue, _ctx) => {
          switch (issue.code) {
            case 'invalid_type':
              return { message: "Please select one of the options" }
            case "invalid_enum_value":
              return { message: "Invalid value." }
            default:
              return { message: "This is a mandatory fields" }
          }
        },
      }),
      countInStock: z.number(),
      costPrice: z.number().min(1, {
        message: "min price in stock is 1"
      }),
      salePrice: z.number().min(1, {
        message: "min price in stock is 1"
      }),
    }))
    .mutation(async ({ ctx, input: { name, category, uom, countInStock, costPrice, salePrice } }) => {
      try {
        return await ctx.prisma.product.create({
          data: {
            name,
            category,
            uom,
            countInStock,
            costPrice,
            salePrice
          }
        })
      } catch (err) {
        console.error(err)
      }
    }),
  update: protectedProcedure
    .input(z.object({
      id: z.string().cuid(),
      name: z.string().min(3, {
        message: "at least have 3 characters"
      }).max(20),
      category: z.nativeEnum(Category, {
        errorMap: (issue, _ctx) => {
          switch (issue.code) {
            case 'invalid_type':
              return { message: "Please select one of the options" }
            case "invalid_enum_value":
              return { message: "Invalid value." }
            default:
              return { message: "This is a mandatory fields" }
          }
        },
      }),
      uom: z.nativeEnum(UomType, {
        errorMap: (issue, _ctx) => {
          switch (issue.code) {
            case 'invalid_type':
              return { message: "Please select one of the options" }
            case "invalid_enum_value":
              return { message: "Invalid value." }
            default:
              return { message: "This is a mandatory fields" }
          }
        },
      }),
      countInStock: z.number(),
      costPrice: z.number().min(1, {
        message: "min price in stock is 1"
      }),
      salePrice: z.number().min(1, {
        message: "min price in stock is 1"
      }),
    }))
    .mutation(async ({ ctx, input: { id, name, category, uom, countInStock, costPrice, salePrice } }) => {
      try {
        return await ctx.prisma.product.update({
          where: { id },
          data: {
            name,
            category,
            uom,
            countInStock,
            costPrice,
            salePrice
          }
        })
      } catch (err) {
        console.error(err)
      }
    }),
  updateCountInStock: protectedProcedure
    .input(z.object({
      id: z.string().cuid(),
      countInStock: z.number()
    }))
    .mutation(async ({ ctx, input: { id, countInStock } }) => {
      try {
        return await ctx.prisma.product.update({
          where: { id },
          data: { countInStock }
        })
      } catch (err) {
        console.error(err)
      }
    }),
  delete: protectedProcedure
    .input(z.object({
      id: z.string().cuid(),
    }))
    .mutation(async ({ ctx, input: { id } }) => {
      try {
        return await ctx.prisma.product.delete({
          where: { id }
        })
      } catch (err) {
        console.error(err)
      }
    })
})
