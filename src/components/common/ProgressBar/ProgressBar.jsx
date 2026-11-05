import styles from "./ProgressBar.module.css"

export default function ProgressBar({ value }) {
  const safe = Math.max(0, Math.min(100, Math.round(value)))
  const level = safe < 35 ? "low" : safe < 70 ? "mid" : "high"

  return (
    <div className={styles.wrap}>
      <span className={styles.value}>{safe}%</span>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={safe}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="진행률"
      >
        <span className={styles.fill} data-level={level} style={{ width: `${safe}%` }} />
      </div>
    </div>
  )
}
