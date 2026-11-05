import Button from "../../common/Button/Button.jsx"
import Icon from "../../common/Icon/Icon.jsx"
import { initialUpdates, overviewMenus } from "../../../data/dashboard.js"
import { cx } from "../../../utils/cx.js"
import styles from "./Sidebar.module.css"

export default function Sidebar({
  projects,
  activeId,
  onSelect,
  onCreate,
  createButtonRef,
}) {
  const personal = projects.filter((project) => !project.shared)
  const shared = projects.filter((project) => project.shared)

  return (
    <aside className={styles.sidebar}>
      <button type="button" className={styles.brand} onClick={() => onSelect("dashboard")}>
        <span className={styles.mark} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        위젯보드
      </button>

      <Button
        ref={createButtonRef}
        block
        leftIcon={<Icon name="plus" size={16} />}
        onClick={onCreate}
      >
        새 프로젝트
      </Button>

      <nav className={styles.nav} aria-label="보드 메뉴">
        <NavButton
          id="dashboard"
          label="대시보드"
          icon="dashboard"
          active={activeId === "dashboard"}
          onSelect={onSelect}
        />

        <p className={styles.section}>내 프로젝트</p>
        <ProjectList projects={personal} activeId={activeId} onSelect={onSelect} />

        <p className={styles.section}>회사 공개 프로젝트</p>
        <ProjectList projects={shared} activeId={activeId} onSelect={onSelect} />

        <p className={styles.section}>모아보기</p>
        {overviewMenus.map((item) => (
          <NavButton
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            active={activeId === item.id}
            onSelect={onSelect}
          />
        ))}
      </nav>

      <section className={styles.updates} aria-label="최근 업데이트">
        <p className={styles.section}>최근 업데이트</p>
        <ul className={styles.updateList}>
          {initialUpdates.map((item) => (
            <li key={item.id} className={styles.update}>
              <span>{item.text}</span>
              <span className={styles.time}>{item.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

function NavButton({ id, label, icon, active, onSelect }) {
  return (
    <button
      type="button"
      className={cx(styles.item, active && styles.active)}
      aria-current={active ? "page" : undefined}
      onClick={() => onSelect(id)}
    >
      <Icon name={icon} size={18} />
      <span className={styles.label}>{label}</span>
    </button>
  )
}

function ProjectList({ projects, activeId, onSelect }) {
  if (projects.length === 0) {
    return <p className={styles.empty}>프로젝트가 없습니다.</p>
  }

  return (
    <ul className={styles.projectList}>
      {projects.map((project) => (
        <li key={project.id}>
          <button
            type="button"
            className={cx(styles.project, activeId === project.id && styles.active)}
            aria-current={activeId === project.id ? "page" : undefined}
            onClick={() => onSelect(project.id)}
          >
            <span className={styles.dot} data-tone={project.tone} />
            <span className={styles.label}>{project.name}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
