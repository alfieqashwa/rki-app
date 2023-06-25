import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { updateCompanySchema } from "~/types/schema"

export const companyRouter = createTRPCRouter({
  // Queries
  customerList: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.company.findMany({
      where: { isCustomer: true },
      include: { address: true, personInCharges: true },
      orderBy: { createdAt: "desc" }
    })
  }),
  // for filtering pic-table based on company name
  companyList: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.company.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" }
      })
    }),
  getCompanyById: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input: { id } }) => {
      return await ctx.prisma.company.findUnique({
        where: { id },
        include: { address: true, personInCharges: true }
      })
    }),

  // Mutations
  createCustomer: protectedProcedure
    .input(z.object({
      name: z.string().min(3, {
        message: "at least have 3 characters"
      }).max(20),
      phone: z.string().min(7, { message: "min length is 7" }).max(12, { message: "max length is 12" }),
      street: z.string().min(5).max(40),
      province: z.string(),
      regency: z.string(),
      district: z.string(),
      village: z.string(),
      postalCode: z.string().length(5, { message: "length must be equal to 5" }),
    }))
    .mutation(async ({ ctx, input: { name, phone, street, province, regency, district, village, postalCode } }) => {
      try {
        return await ctx.prisma.company.create({
          data: {
            name,
            phone,
            address: {
              create: {
                street,
                province,
                regency,
                district,
                village,
                postalCode
              }
            },
          },
        })
      } catch (err) {
        console.error(err)
      }
    }),
  updateCompanyById: protectedProcedure
    .input(updateCompanySchema)
    .mutation(async ({ ctx, input: { id, name, street, province, regency, district, village, postalCode } }) => {
      try {
        return await ctx.prisma.company.update({
          where: { id },
          data: {
            name,
            address: {
              update: {
                street,
                province,
                regency,
                district,
                village,
                postalCode,
              }
            },
          }
        })
      } catch (err) {
        console.error(err)
      }
    }),
  deleteCompany: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input: { id } }) => {
      try {
        return await ctx.prisma.company.delete({
          where: { id }
        })
      } catch (err) {
        console.error(err)
      }
    })
})