import { useState } from "react"
import Button from "../../common/Button/Button.jsx"
import Icon from "../../common/Icon/Icon.jsx"
import WidgetBox from "../../common/WidgetBox/WidgetBox.jsx"
import { formatMonthTitle, toDateKey } from "../../../utils/date.js"
import { cx } from "../../../utils/cx.js"
import styles from "./ScheduleCalendar.module.css"

const weekdays = ["일", "월", "화", "수", "목", "금", "토"]

export default function ScheduleCalendar({ events, emptyLabel, onOpen, className }) {
  const [cursor, setCursor] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDate())
  const [today] = useState(() => new Date())
  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const startOffset = new Date(year, month, 1).getDay()
  const dayCount = new Date(year, month + 1, 0).getDate()
  const cells = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: dayCount }, (_, index) => index + 1),
  ]
  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`
  const monthEvents = events
    .filter((event) => event.date.startsWith(monthKey))
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  const activeDay = Math.min(selectedDay, dayCount)
  const selectedKey = toDateKey(new Date(year, month, activeDay))
  const selectedEvents = monthEvents.filter((event) => event.date === selectedKey)
  const eventDays = new Set(monthEvents.map((event) => Number(event.date.slice(-2))))
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month

  function moveMonth(offset) {
    const next = new Date(year, month + offset, 1)
    setCursor(next)
    const nextDayCount = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()
    setSelectedDay((day) => Math.min(day, nextDayCount))
  }

  return (
    <WidgetBox
      className={className}
      title="일정"
      action={
        onOpen ? (
          <Button variant="ghost" size="sm" onClick={onOpen}>
            월간
          </Button>
        ) : null
      }
    >
      <div className={styles.monthBar}>
        <Button variant="icon" aria-label="이전 달" onClick={() => moveMonth(-1)}>
          <Icon name="chevronLeft" size={16} />
        </Button>
        <strong>{formatMonthTitle(cursor)}</strong>
        <Button variant="icon" aria-label="다음 달" onClick={() => moveMonth(1)}>
          <Icon name="chevronRight" size={16} />
        </Button>
      </div>

      <div className={styles.weekdays}>
        {weekdays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className={styles.days}>
        {cells.map((day, index) =>
          day ? (
            <button
              key={day}
              type="button"
              className={cx(
                styles.day,
                index % 7 === 0 && styles.sun,
                index % 7 === 6 && styles.sat,
                day === activeDay && styles.selected,
                isCurrentMonth && day === today.getDate() && day !== activeDay && styles.today,
              )}
              aria-pressed={day === activeDay}
              aria-label={`${day}일`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
              {eventDays.has(day) ? <i className={styles.dot} /> : null}
            </button>
          ) : (
            <span key={`empty-${index}`} />
          ),
        )}
      </div>

      <div className={styles.agenda}>
        <p className={styles.agendaTitle}>{activeDay}일 일정</p>
        {selectedEvents.length === 0 ? (
          <p className={styles.quiet}>{monthEvents.length === 0 && emptyLabel ? emptyLabel : "등록된 일정이 없습니다."}</p>
        ) : (
          <ul className={styles.agendaList}>
            {selectedEvents.map((event) => (
              <li key={event.id}>
                <span>{event.time}</span>
                {event.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </WidgetBox>
  )
}
