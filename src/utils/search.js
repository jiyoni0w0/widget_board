export function matchQuery(query, ...parts) {
  const keyword = query.trim().toLowerCase()
  if (!keyword) return true
  return parts.some((part) => String(part ?? "").toLowerCase().includes(keyword))
}
