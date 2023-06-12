import { CompanyStatus } from "@prisma/client"
import { z } from "zod"

export const updateCompanySchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(3, {
    message: "at least have 3 characters"
  }).max(20),
  status: z.nativeEnum(CompanyStatus, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_type':
          return { message: 'Please select one!' }
        case 'invalid_enum_value':
          return { message: 'Please select one!' }
        default:
          return { message: 'Invalid!' }
      }
    },
  }),
  street: z.string().min(5).max(40),
  province: z.string(),
  regency: z.string(),
  district: z.string(),
  village: z.string(),
  postalCode: z.string().length(5)
})