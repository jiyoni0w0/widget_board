import { cx } from "../../../utils/cx.js"
import Icon from "../Icon/Icon.jsx"
import styles from "./Shortcut.module.css"

export default function Shortcut({ icon, label, tone = "main", pressed = false, onClick }) {
  return (
    <button type="button" className={cx(styles.item, pressed && styles.pressed)} aria-pressed={pressed} onClick={onClick}>
      <span className={cx(styles.icon, styles[tone])}>
        <Icon name={icon} size={20} />
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  )
}
