import Badge from "../../common/Badge/Badge.jsx"
import Button from "../../common/Button/Button.jsx"
import ProgressBar from "../../common/ProgressBar/ProgressBar.jsx"
import WidgetBox from "../../common/WidgetBox/WidgetBox.jsx"
import styles from "./ProjectTasks.module.css"

const statusTone = {
  진행: "main",
  검토: "sub",
  대기: "amber",
  완료: "mint",
}

export default function ProjectTasks({ project, tasks, emptyLabel, description, className, onOpen }) {
  return (
    <WidgetBox
      className={className}
      title={project.name}
      marker={project.tone}
      description={description}
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
              <div className={styles.body}>
                <p className={styles.name}>{task.title}</p>
                <div className={styles.meta}>
                  <span>{task.code}</span>
                  <Badge tone={statusTone[task.status] ?? "main"}>{task.status}</Badge>
                </div>
              </div>
              <ProgressBar value={task.progress} />
            </li>
          ))}
        </ul>
      )}
    </WidgetBox>
  )
}
