import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc"
import { createPicList, upsertPicSchema } from "~/types/schema"

export const picRouter = createTRPCRouter({
  // Mutations
  createList: protectedProcedure
    .input(createPicList)
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
    })
})
