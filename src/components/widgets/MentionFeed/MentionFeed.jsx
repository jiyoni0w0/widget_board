import Avatar from "../../common/Avatar/Avatar.jsx"
import Button from "../../common/Button/Button.jsx"
import WidgetBox from "../../common/WidgetBox/WidgetBox.jsx"
import styles from "./MentionFeed.module.css"

export default function MentionFeed({ items, emptyLabel, onOpen, className }) {
  return (
    <WidgetBox
      className={className}
      title="나를 언급"
      action={
        onOpen ? (
          <Button variant="ghost" size="sm" onClick={onOpen}>
            전체
          </Button>
        ) : null
      }
    >
      {items.length === 0 ? (
        <p className="empty-copy">{emptyLabel}</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <Avatar initial={item.initial} tone={item.tone} />
              <div className={styles.body}>
                <div className={styles.meta}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.time}>{item.time}</span>
                </div>
                <p className={styles.text}>{item.text}</p>
                <p className={styles.project}>{item.project}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </WidgetBox>
  )
}
