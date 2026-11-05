import Avatar from "../../common/Avatar/Avatar.jsx"
import WidgetBox from "../../common/WidgetBox/WidgetBox.jsx"
import styles from "./ChatRooms.module.css"

export default function ChatRooms({ items, emptyLabel, activeId, onSelect, className }) {
  return (
    <WidgetBox className={className} title="채팅 방">
      {items.length === 0 ? (
        <p className="empty-copy">{emptyLabel}</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={styles.item}
                aria-pressed={activeId === item.id}
                onClick={() => onSelect(item.id)}
              >
                <Avatar initial={item.initial} tone={item.tone} />
                <span className={styles.body}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.preview}>{item.preview}</span>
                </span>
                <span className={styles.side}>
                  <span className={styles.time}>{item.time}</span>
                  {item.unread > 0 ? <span className={styles.unread}>{item.unread}</span> : null}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </WidgetBox>
  )
}
