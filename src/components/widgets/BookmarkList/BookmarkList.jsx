import Badge from "../../common/Badge/Badge.jsx"
import Button from "../../common/Button/Button.jsx"
import Icon from "../../common/Icon/Icon.jsx"
import WidgetBox from "../../common/WidgetBox/WidgetBox.jsx"
import styles from "./BookmarkList.module.css"

export default function BookmarkList({ items, emptyLabel, onOpen, className }) {
  return (
    <WidgetBox
      className={className}
      title="북마크"
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
              <span className={styles.tile}>
                <Icon name="bookmark" size={16} />
              </span>
              <div className={styles.body}>
                <p className={styles.name}>{item.title}</p>
                <p className={styles.source}>{item.source}</p>
              </div>
              <Badge tone="sub">{item.tag}</Badge>
            </li>
          ))}
        </ul>
      )}
    </WidgetBox>
  )
}
