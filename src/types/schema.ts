import { StatusSaleOrder } from "@prisma/client"
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

export const createPicSchema = z.object({
  name: z.string().min(3, {
    message: "at least have 3 characters"
  }).max(20),
  position: z.string().min(3, {
    message: "at least have 3 characters"
  }).max(20),
  companyId: z.string().cuid()
})

export const createPicListSchema = z.array(
  z.object({
    name: z.string().min(3, {
      message: "at least have 3 characters"
    }).max(20),
    position: z.string().min(3, {
      message: "at least have 3 characters"
    }).max(20),
    companyId: z.string().cuid()
  }))

export const upsertPicSchema = (z.object({
  id: z.string().cuid(),
  companyId: z.string().cuid(),
  name: z.string().min(3, { message: "min length is 3" }).max(20, { message: "max length is 20" }),
  email: z.string().email().nullable(),
  position: z.string().min(3, { message: "min length is 3" }).max(20, { message: "max length is 20" }).nullable(),
  createName: z.string().min(3, { message: "min length is 3" }).max(20, { message: "max length is 20" }),
  createEmail: z.string().email().nullable(),
  createPosition: z.string().min(3, { message: "min length is 3" }).max(20, { message: "max length is 20" }).nullable(),
}))

export const createSaleSchema = z.object({
  orderNumber: z.string(),
  dateOrdered: z.date(),
  companyId: z.string().cuid(),
  status: z.nativeEnum(StatusSaleOrder),
  userId: z.string().cuid(),
  totalPrice: z.number(),
  orderItems: z.array(
    z.object({
      quantity: z.number(),
      description: z.string(),
      productId: z.string().cuid(),
      saleOrderId: z.string().cuid()
    })
  )
})

export const createOrderItemSchema = z.object({
  quantity: z.number(),
  description: z.string(),
  productId: z.string().cuid(),
  saleOrderId: z.string().cuid()
})