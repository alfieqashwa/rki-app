import { exampleRouter } from "~/server/api/routers/example"
import { createTRPCRouter } from "~/server/api/trpc"
import { addressRouter } from "./routers/address"
import { companyRouter } from "./routers/company"
import { userRouter } from "./routers/user"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  address: addressRouter,
  user: userRouter,
  company: companyRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
