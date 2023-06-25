import { z } from "zod"
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc"
import { createPicListSchema, createPicSchema, upsertPicSchema } from "~/types/schema"

export const picRouter = createTRPCRouter({
  // Queries
  picList: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.personInCharge.findMany({
        include: { company: { select: { name: true } } },
        orderBy: { name: "asc" }
      })
    }),
  getByCompanyId: protectedProcedure
    .input(z.object({ companyId: z.string().cuid() }))
    .query(async ({ ctx, input: { companyId } }) => {
      return await ctx.prisma.personInCharge.findMany(({
        where: { companyId },
      }))
    }),
  // Mutations
  create: protectedProcedure
    .input(createPicSchema)
    .mutation(async ({ ctx, input: { name, position, companyId } }) => {
      try {
        return await ctx.prisma.personInCharge.create({
          data: {
            name,
            position,
            companyId
          }
        })
      } catch (err) {
        console.error(err)
      }
    }),
  createList: protectedProcedure
    .input(createPicListSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.personInCharge.createMany({
          data: input
        })
      } catch (err) {
        console.error(err)
      }
    }),

  // not use this api yet
  upsert: protectedProcedure
    .input(upsertPicSchema)
    .mutation(async ({ ctx, input: {
      id,
      companyId,
      createName,
      createEmail,
      createPosition,
      name,
      email,
      position
    } }) => {
      try {
        return await ctx.prisma.personInCharge.upsert({
          where: { id },
          update: { name, email, position, companyId },
          create: { name: createName, email: createEmail, position: createPosition, companyId }
        })
      } catch (err) {
        console.error(err)

      }
    }),
  update: protectedProcedure
    .input(z.object({
      id: z.string().cuid(),
      name: z.string().min(3, { message: "min length is 3" }).max(20, { message: "max length is 20" }),
      position: z.string().min(3, { message: "min length is 3" }).max(20, { message: "max length is 20" }).nullable(),
    }))
    .mutation(async ({ ctx, input: { id, name, position } }) => {
      try {
        return await ctx.prisma.personInCharge.update({
          where: { id },
          data: { name, position }
        })
      } catch (err) {
        console.error(err)

      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input: { id } }) => {
      try {
        return await ctx.prisma.personInCharge.delete({
          where: { id }
        })
      } catch (err) {
        console.error(err)
      }
    })
})
