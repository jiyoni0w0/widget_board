import Icon from "../../common/Icon/Icon.jsx"
import {
  attendanceToday,
  initialApprovals,
  initialNotices,
  initialTodayTodos,
  leaveBalance,
  todayMeetings,
} from "../../../data/dashboard.js"
import styles from "./StatusBar.module.css"

export default function StatusBar() {
  const [notice, ...rest] = initialNotices
  const openTodos = initialTodayTodos.filter((item) => !item.done).length

  return (
    <section className={styles.bar} aria-label="오늘 현황">
      <p className={styles.notice}>
        <Icon name="pin" size={14} />
        <span className={styles.tag}>공지</span>
        <span className={styles.noticeTitle}>{notice?.title ?? "새 공지 없음"}</span>
        {rest.length > 0 ? <span className={styles.more}>외 {rest.length}건</span> : null}
      </p>
      <p className={styles.group}>
        <Icon name="clock" size={14} />
        <span>
          출근 <strong>{attendanceToday.clockIn}</strong>
        </span>
        <span>
          근무 <strong>{attendanceToday.worked}</strong>
        </span>
        <span className={styles.pill}>{attendanceToday.status}</span>
      </p>
      <p className={styles.group}>
        <span>
          오늘 할 일 <strong>{openTodos}</strong>
        </span>
        <span>
          회의 <strong>{todayMeetings.length}</strong>
        </span>
        <span>
          결재 <strong>{initialApprovals.length}</strong>
        </span>
      </p>
      <p className={styles.leave}>잔여 연차 {leaveBalance}</p>
    </section>
  )
}
