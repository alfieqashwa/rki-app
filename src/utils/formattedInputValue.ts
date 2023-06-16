
// format input to thousand separator
export function formattedInputValue(input: string) {
  return input.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
