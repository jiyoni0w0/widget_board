import { useId } from "react"
import { cx } from "../../../utils/cx.js"
import styles from "./Input.module.css"

export default function Input({
  label,
  error,
  icon,
  multiline = false,
  id,
  className,
  ...props
}) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const errorId = error ? `${fieldId}-error` : undefined
  const Control = multiline ? "textarea" : "input"

  return (
    <div className={cx(styles.field, className)}>
      {label ? (
        <label className={styles.label} htmlFor={fieldId}>
          {label}
        </label>
      ) : null}
      <div className={cx(styles.control, error && styles.invalid, multiline && styles.multiline)}>
        {icon ? <span className={styles.icon}>{icon}</span> : null}
        <Control
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          {...props}
        />
      </div>
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
