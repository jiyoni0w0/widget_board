import { cx } from "../../../utils/cx.js"
import styles from "./Badge.module.css"

export default function Badge({ tone = "main", children }) {
  return <span className={cx(styles.badge, styles[tone])}>{children}</span>
}
