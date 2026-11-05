import { cx } from "../../../utils/cx.js"
import styles from "./WidgetBox.module.css"

export default function WidgetBox({ title, description, action, marker, children, className }) {
  return (
    <section className={cx(styles.box, className)}>
      <header className={styles.head}>
        <div className={styles.titleBlock}>
          <div className={styles.titleRow}>
            {marker ? <span className={styles.marker} data-tone={marker} aria-hidden="true" /> : null}
            <h2 className={styles.title}>{title}</h2>
          </div>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}
