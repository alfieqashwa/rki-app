import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const companyRouter = createTRPCRouter({
  // Queries
  customerList: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.company.findMany({
      where: { status: "CUSTOMER" },
      include: { address: true, personInCharges: true }
    })
  }),

  // Mutations
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(3, {
        message: "at least have 3 characters"
      }).max(20),
      street: z.string().min(5).max(40),
      province: z.string(),
      regency: z.string(),
      district: z.string(),
      village: z.string(),
      postalCode: z.string().length(5),
    }))
    .mutation(async ({ ctx, input: { name, street, province, regency, district, village, postalCode } }) => {
      try {
        return await ctx.prisma.company.create({
          data: {
            name,
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
          }
        })
      } catch (err) {
        console.error(err)
      }
    })
})