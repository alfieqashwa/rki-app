import { format } from "date-fns"

export function formattedOrderNumber(dateOrdered: Date | string): string {

  const formattedOrderDate = dateOrdered instanceof Date ? format(dateOrdered, `yyyyMMdd-000`) : dateOrdered
  const threeLastNumber = formattedOrderDate.slice(-3)
  const addOne = Number(threeLastNumber) + 1
  const addCustomZero = addOne <= 9
    ? "00"
    : addOne >= 9 && addOne <= 99
      ? "0"
      : ""
  return formattedOrderDate.slice(0, formattedOrderDate.length - 3) + addCustomZero + addOne.toString()
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