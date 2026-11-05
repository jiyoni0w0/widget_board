import Icon from "../../common/Icon/Icon.jsx"
import Input from "../../common/Input/Input.jsx"
import Shortcut from "../../common/Shortcut/Shortcut.jsx"
import { shortcuts } from "../../../data/dashboard.js"
import styles from "./DashboardHeader.module.css"

export default function DashboardHeader({
  name,
  greeting,
  dateLabel,
  board,
  onBoardChange,
  query,
  onQueryChange,
  shortcut,
  onShortcut,
}) {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div>
          <h1 className={styles.hello}>
            {name}님, {greeting}
          </h1>
          <p className={styles.lead}>프로젝트와 업무를 한 화면에서 살펴보세요.</p>
          <div className={styles.tabs} role="tablist" aria-label="보드 종류">
            <button
              type="button"
              role="tab"
              className={styles.tab}
              aria-selected={board === "mine"}
              onClick={() => onBoardChange("mine")}
            >
              내 보드
            </button>
            <button
              type="button"
              role="tab"
              className={styles.tab}
              aria-selected={board === "team"}
              onClick={() => onBoardChange("team")}
            >
              팀 보드
            </button>
          </div>
        </div>
        <div className={styles.meta}>
          <p className={styles.date}>{dateLabel}</p>
          <span className={styles.weather}>
            <Icon name="sun" size={16} />
            맑음 18°
          </span>
        </div>
      </div>

      <Input
        icon={<Icon name="search" size={18} />}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="프로젝트, 업무, 메시지를 검색하세요"
        aria-label="검색"
        autoComplete="off"
      />

      <div className={styles.shortcuts}>
        {shortcuts.map((item) => (
          <Shortcut
            key={item.id}
            icon={item.icon}
            label={item.label}
            tone={item.tone}
            pressed={shortcut === item.id}
            onClick={() => onShortcut(item)}
          />
        ))}
      </div>
    </header>
  )
}
