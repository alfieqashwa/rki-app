import { format } from "date-fns"

export function formattedOrderNumber(dateOrdered: Date | string | undefined): string {
  if (typeof dateOrdered === "undefined") return ""

  let formattedOrderDate: string

  if (dateOrdered instanceof Date) {
    formattedOrderDate = format(dateOrdered, "yyyyMMdd-000")
  } else {
    formattedOrderDate = dateOrdered
  }

  const threeLastCharacters = formattedOrderDate.slice(-3)
  const incrementByOne = Number(threeLastCharacters) + 1

  const addConditionalZero =
    incrementByOne <= 9
      ? "00"
      : incrementByOne > 9 && incrementByOne <= 99
        ? "0"
        : ""

  const len = formattedOrderDate.length
  const generatedFormattedOrderNumber = formattedOrderDate.slice(0, len - 3) + addConditionalZero + incrementByOne.toString()

  return generatedFormattedOrderNumber
}

// ========== TESTING ============

// const originalString1 = format(new Date(), "yyyyMMdd-000")
// console.log(originalString1.length)

// const originalString9 = '20230620-009'
// const originalString10 = '20230620-010'
// const originalString23 = '20230620-023'
// const originalString98 = '20230620-098'
// const originalString99 = '20230620-099'
// const originalString100 = '20230620-100'

// const result1 = formattedOrderNumber(originalString1)
// const result9 = formattedOrderNumber(originalString9)
// const result10 = formattedOrderNumber(originalString10)
// const result23 = formattedOrderNumber(originalString23)
// const result98 = formattedOrderNumber(originalString98)
// const result99 = formattedOrderNumber(originalString99)
// const result100 = formattedOrderNumber(originalString100)
// console.log({
//   result1,
//   result9,
//   result10,
//   result23,
//   result98,
//   result99,
//   result100
// })