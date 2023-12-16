export const formatDateToString = (value: Date): string => {
  return new Date(value).toISOString().split("T")[0]
}