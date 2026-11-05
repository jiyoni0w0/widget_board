import Badge from "../../common/Badge/Badge.jsx"
import Button from "../../common/Button/Button.jsx"
import Icon from "../../common/Icon/Icon.jsx"
import WidgetBox from "../../common/WidgetBox/WidgetBox.jsx"
import { cx } from "../../../utils/cx.js"
import styles from "./AssignedTasks.module.css"

const statusTone = {
  진행: "main",
  검토: "sub",
  대기: "amber",
  완료: "mint",
}

export default function AssignedTasks({ tasks, emptyLabel, onToggle, onOpen, className }) {
  return (
    <WidgetBox
      className={className}
      title="내가 담당중인 업무"
      action={
        onOpen ? (
          <Button variant="ghost" size="sm" onClick={onOpen}>
            전체
          </Button>
        ) : null
      }
    >
      {tasks.length === 0 ? (
        <p className="empty-copy">{emptyLabel}</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.item}>
              <button
                type="button"
                className={cx(styles.check, task.done && styles.checked)}
                role="checkbox"
                aria-checked={task.done}
                aria-label={`${task.title} 완료`}
                onClick={() => onToggle(task.id)}
              >
                {task.done ? <Icon name="check" size={14} /> : null}
              </button>
              <p className={cx(styles.name, task.done && styles.done)}>{task.title}</p>
              <Badge tone={task.done ? "mint" : statusTone[task.status] ?? "main"}>
                {task.done ? "완료" : task.status}
              </Badge>
              <span className={styles.due}>{task.due}</span>
            </li>
          ))}
        </ul>
      )}
    </WidgetBox>
  )
}
