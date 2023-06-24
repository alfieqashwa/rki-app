
export function calculateNewStock(currentStockInCount: number, currentQty: number, updatedQty: number) {
  const initialStockInCount = currentStockInCount + currentQty
  const updatedStock = initialStockInCount - updatedQty

  return updatedStock
}
