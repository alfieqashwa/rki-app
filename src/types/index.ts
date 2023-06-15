import { Category } from "@prisma/client"
import { Tag, type LucideIcon } from "lucide-react"

export type Options = {
  label: string
  value: string
  icon?: LucideIcon
}

export const categories: Options[] = [
  {
    value: Category.Product,
    label: "Product",
    icon: Tag,
  },
  {
    value: Category.Service,
    label: "Service",
    icon: Tag,
  },
]