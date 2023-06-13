import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc"
import { upsertPicSchema } from "~/types/schema"

export const picRouter = createTRPCRouter({
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
