import { z } from "zod"

export const updateCompanySchema = z.object({
  id: z.string().cuid(),
  phone: z.string().min(7, { message: "min length is 7" }).max(12, { message: "max length is 12" }),
  name: z.string().min(3, {
    message: "at least have 3 characters"
  }).max(20),
  street: z.string().min(5).max(40),
  province: z.string(),
  regency: z.string(),
  district: z.string(),
  village: z.string(),
  postalCode: z.string().length(5)
})