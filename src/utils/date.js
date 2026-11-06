export function formatKoreanDate(date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date)
}

export function formatKoreanDateShort(date) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date)
}

export function formatMonthTitle(date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
  }).format(date)
}

export function getGreeting(date) {
  const hour = date.getHours()
  if (hour < 11) return "좋은 아침입니다"
  if (hour < 18) return "즐거운 오후입니다"
  return "편안한 저녁입니다"
}

export function toDateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${date.getFullYear()}-${month}-${day}`
}
