export function duePhrase(tasks) {
  if (tasks.length === 0) return "임박한 마감 없음"
  return `${tasks[0].due} ${tasks[0].title} 마감`
}

export function nextClock(when) {
  return String(when).replace(/^오늘\s*/, "")
}

if (duePhrase([]) !== "임박한 마감 없음") throw new Error("due phrase empty")
if (duePhrase([{ due: "내일", title: "시안" }]) !== "내일 시안 마감") throw new Error("due phrase one")
if (nextClock("오늘 14:00") !== "14:00") throw new Error("next clock")
