import { cx } from "../../../utils/cx.js"
import styles from "./Avatar.module.css"

export default function Avatar({ initial, tone = "main" }) {
  return <span className={cx(styles.avatar, styles[tone])}>{initial}</span>
}
