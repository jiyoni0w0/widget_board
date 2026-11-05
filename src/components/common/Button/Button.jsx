import { cx } from "../../../utils/cx.js"
import styles from "./Button.module.css"

export default function Button({
  variant = "primary",
  size = "md",
  block = false,
  leftIcon,
  children,
  className,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cx(styles.button, styles[variant], styles[size], block && styles.block, className)}
      {...props}
    >
      {leftIcon}
      {children}
    </button>
  )
}
