import { useCallback, useEffect, useRef, useState } from "react"
import { GridStack, GridStackItem } from "gridstack/dist/react"
import "gridstack/dist/gridstack.css"
import Button from "../../components/Button/Button.jsx"
import Icon from "../../components/Icon/Icon.jsx"
import Input from "../../components/Input/Input.jsx"
import Modal from "../../components/Modal/Modal.jsx"
import WidgetBox from "../../components/WidgetBox/WidgetBox.jsx"
import DashboardHeader from "./layout/DashboardHeader/DashboardHeader.jsx"
import Sidebar from "../../layouts/Sidebar/Sidebar.jsx"
import StatusBar from "./layout/StatusBar/StatusBar.jsx"
import AssignedTasks from "./widgets/AssignedTasks/AssignedTasks.jsx"
import BookmarkList from "./widgets/BookmarkList/BookmarkList.jsx"
import ChatRooms from "./widgets/ChatRooms/ChatRooms.jsx"
import MentionFeed from "./widgets/MentionFeed/MentionFeed.jsx"
import ProjectTasks from "./widgets/ProjectTasks/ProjectTasks.jsx"
import ScheduleCalendar from "./widgets/ScheduleCalendar/ScheduleCalendar.jsx"
import {
  currentUser,
  initialAssigned,
  initialBookmarks,
  initialChats,
  initialEvents,
  initialMentions,
  initialProjects,
  initialTasks,
  nextWork,
  overviewMenus,
  placeholderCopy,
  projectTones,
  dueSoonTasks,
} from "./data.js"
import { duePhrase, nextClock } from "../../utils/brief.js"
import { formatKoreanDate, formatKoreanDateShort, getGreeting } from "../../utils/date.js"
import { matchQuery } from "../../utils/search.js"
import styles from "./Dashboard.module.css"

const gridOptions = {
  margin: 8,
  cellHeight: 60,
  handle: ".widget-drag-handle",
  columnOpts: {
    breakpoints: [{ w: 800, c: 1, layout: "list" }],
  },
}

const slots = {
  projectA: { x: 0, y: 0, w: 4, h: 6, minH: 2 },
  projectB: { x: 4, y: 0, w: 4, h: 6, minH: 2 },
  bookmarks: { x: 8, y: 0, w: 4, h: 6, minH: 2 },
  mentions: { x: 0, y: 6, w: 4, h: 7, minH: 2 },
  calendar: { x: 4, y: 6, w: 4, h: 7, minH: 2 },
  chats: { x: 8, y: 6, w: 4, h: 11, minH: 2 },
  assigned: { x: 0, y: 13, w: 8, h: 4, minH: 2 },
}

function DashboardBoard({
  firstProject,
  secondProject,
  tasksFor,
  assignedTasks,
  emptyText,
  mentions,
  events,
  bookmarks,
  chats,
  activeChat,
  onOpenProject,
  onOpenCreate,
  onOpenMenu,
  onToggleAssigned,
  onSelectChat,
}) {
  return (
    <GridStack className={styles.grid} options={gridOptions}>
      <GridStackItem id="project-a" options={slots.projectA}>
        {firstProject ? (
          <ProjectTasks
            project={firstProject}
            tasks={tasksFor(firstProject)}
            emptyLabel={emptyText("아직 등록된 업무가 없습니다.")}
            onOpen={() => onOpenProject(firstProject.id)}
            dragHandle
          />
        ) : (
          <WidgetBox title="내 프로젝트" description="이 보드에 표시할 프로젝트가 없습니다." dragHandle>
            <Button onClick={onOpenCreate}>새 프로젝트</Button>
          </WidgetBox>
        )}
      </GridStackItem>
      <GridStackItem id="project-b" options={slots.projectB}>
        {secondProject ? (
          <ProjectTasks
            project={secondProject}
            tasks={tasksFor(secondProject)}
            emptyLabel={emptyText("아직 등록된 업무가 없습니다.")}
            onOpen={() => onOpenProject(secondProject.id)}
            dragHandle
          />
        ) : (
          <WidgetBox title="새 프로젝트" description="카드를 하나 더 채울 수 있어요." dragHandle>
            <Button onClick={onOpenCreate}>프로젝트 추가</Button>
          </WidgetBox>
        )}
      </GridStackItem>
      <GridStackItem id="mentions" options={slots.mentions}>
        <MentionFeed
          items={mentions}
          emptyLabel={emptyText("언급이 없습니다.")}
          onOpen={() => onOpenMenu("mentions")}
          dragHandle
        />
      </GridStackItem>
      <GridStackItem id="calendar" options={slots.calendar}>
        <ScheduleCalendar
          events={events}
          emptyLabel={emptyText("등록된 일정이 없습니다.")}
          onOpen={() => onOpenMenu("calendar")}
          dragHandle
        />
      </GridStackItem>
      <GridStackItem id="assigned" options={slots.assigned}>
        <AssignedTasks
          tasks={assignedTasks}
          emptyLabel={emptyText("담당한 업무가 없습니다.")}
          onToggle={onToggleAssigned}
          onOpen={() => onOpenMenu("tasks")}
          dragHandle
        />
      </GridStackItem>
      <GridStackItem id="bookmarks" options={slots.bookmarks}>
        <BookmarkList
          items={bookmarks}
          emptyLabel={emptyText("저장한 북마크가 없습니다.")}
          onOpen={() => onOpenMenu("bookmarks")}
          dragHandle
        />
      </GridStackItem>
      <GridStackItem id="chats" options={slots.chats}>
        <ChatRooms
          items={chats}
          emptyLabel={emptyText("대화방이 없습니다.")}
          activeId={activeChat}
          onSelect={onSelectChat}
          dragHandle
        />
      </GridStackItem>
    </GridStack>
  )
}

export default function Dashboard() {
  const [today] = useState(() => new Date())
  const [projects, setProjects] = useState(initialProjects)
  const [tasksByProject, setTasksByProject] = useState(initialTasks)
  const [assigned, setAssigned] = useState(initialAssigned)
  const [chats, setChats] = useState(initialChats)
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [board, setBoard] = useState("mine")
  const [query, setQuery] = useState("")
  const [shortcut, setShortcut] = useState(null)
  const [activeChat, setActiveChat] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState({ name: "", description: "", tone: "main" })
  const [nameError, setNameError] = useState("")
  const createButtonRef = useRef(null)
  const wasOpen = useRef(false)

  const closeModal = useCallback(() => setModalOpen(false), [])

  useEffect(() => {
    if (wasOpen.current && !modalOpen) createButtonRef.current?.focus()
    wasOpen.current = modalOpen
  }, [modalOpen])

  const boardProjects = projects.filter((project) => (board === "team" ? project.shared : !project.shared))
  const focusedProject = projects.find((project) => project.id === activeMenu)
  const placeholder = placeholderCopy[activeMenu]
  const placeholderMenu = overviewMenus.find((item) => item.id === activeMenu)

  function emptyText(fallback) {
    return query.trim() ? "검색 결과가 없습니다." : fallback
  }

  function tasksFor(project) {
    return (tasksByProject[project.id] ?? []).filter((task) =>
      matchQuery(query, task.title, task.code, task.status, project.name),
    )
  }

  function assignedFor(projectId) {
    return assigned.filter((item) => {
      const project = projects.find((entry) => entry.id === item.projectId)
      const matchesProject = projectId ? item.projectId === projectId : true
      const matchesBoard = projectId ? true : board === "team" ? project?.shared : !project?.shared
      return matchesProject && matchesBoard && matchQuery(query, item.title, item.status, project?.name)
    })
  }

  const bookmarks = initialBookmarks.filter((item) => matchQuery(query, item.title, item.source, item.tag))
  const mentions = initialMentions.filter(
    (item) => item.board === board && matchQuery(query, item.name, item.text, item.project),
  )
  const visibleChats = chats.filter((item) => matchQuery(query, item.name, item.preview))
  const events = initialEvents.filter((item) => matchQuery(query, item.title, item.time))

  function openCreate() {
    setDraft({ name: "", description: "", tone: "main" })
    setNameError("")
    setModalOpen(true)
  }

  function handleCreate(event) {
    event.preventDefault()
    const name = draft.name.trim()
    if (!name) {
      setNameError("프로젝트 이름을 입력해 주세요.")
      return
    }

    const id = crypto.randomUUID()
    setProjects((current) => [
      {
        id,
        name,
        description: draft.description.trim(),
        tone: draft.tone,
        shared: board === "team",
      },
      ...current,
    ])
    setTasksByProject((current) => ({ ...current, [id]: [] }))
    setActiveMenu(id)
    setModalOpen(false)
  }

  function toggleAssigned(id) {
    setAssigned((current) =>
      current.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    )
  }

  function selectChat(id) {
    setActiveChat(id)
    setChats((current) => current.map((chat) => (chat.id === id ? { ...chat, unread: 0 } : chat)))
  }

  function handleShortcut(item) {
    const next = shortcut === item.id ? null : item.id
    setShortcut(next)
    if (item.id === "cal") setActiveMenu(next ? "calendar" : "dashboard")
  }

  const [firstProject, secondProject] = boardProjects

  let content
  if (placeholder) {
    content = (
      <WidgetBox
        title={placeholder.title}
        description={placeholder.body}
        action={
          <Button variant="ghost" size="sm" onClick={() => setActiveMenu("dashboard")}>
            대시보드
          </Button>
        }
      >
        <div className={styles.placeholder}>
          <span className={styles.placeholderIcon}>
            <Icon name={placeholderMenu?.icon ?? "dashboard"} size={22} />
          </span>
          <p>목록 데이터는 대시보드의 위젯에서 먼저 확인할 수 있어요.</p>
        </div>
      </WidgetBox>
    )
  } else if (focusedProject) {
    content = (
      <div className={styles.stack}>
        <ProjectTasks
          project={focusedProject}
          tasks={tasksFor(focusedProject)}
          description={focusedProject.description}
          emptyLabel={emptyText("아직 등록된 업무가 없습니다.")}
        />
        <AssignedTasks
          tasks={assignedFor(focusedProject.id)}
          emptyLabel={emptyText("담당한 업무가 없습니다.")}
          onToggle={toggleAssigned}
        />
      </div>
    )
  } else if (activeMenu === "tasks") {
    content = (
      <div className={styles.stack}>
        <div className={styles.pair}>
          {boardProjects.map((project) => (
            <ProjectTasks
              key={project.id}
              project={project}
              tasks={tasksFor(project)}
              emptyLabel={emptyText("아직 등록된 업무가 없습니다.")}
              onOpen={() => setActiveMenu(project.id)}
            />
          ))}
        </div>
        <AssignedTasks
          tasks={assignedFor()}
          emptyLabel={emptyText("담당한 업무가 없습니다.")}
          onToggle={toggleAssigned}
        />
      </div>
    )
  } else if (activeMenu === "calendar") {
    content = <ScheduleCalendar events={events} emptyLabel={emptyText("등록된 일정이 없습니다.")} />
  } else if (activeMenu === "bookmarks") {
    content = <BookmarkList items={bookmarks} emptyLabel={emptyText("저장한 북마크가 없습니다.")} />
  } else if (activeMenu === "mentions") {
    content = <MentionFeed items={mentions} emptyLabel={emptyText("언급이 없습니다.")} />
  } else {
    content = (
      <>
        <StatusBar />
        <DashboardBoard
          firstProject={firstProject}
          secondProject={secondProject}
          tasksFor={tasksFor}
          assignedTasks={assignedFor()}
          emptyText={emptyText}
          mentions={mentions}
          events={events}
          bookmarks={bookmarks}
          chats={visibleChats}
          activeChat={activeChat}
          onOpenProject={setActiveMenu}
          onOpenCreate={openCreate}
          onOpenMenu={setActiveMenu}
          onToggleAssigned={toggleAssigned}
          onSelectChat={selectChat}
        />
      </>
    )
  }

  return (
    <div>
      
      <div className={styles.shell}>
        <Sidebar
          projects={projects}
          activeId={activeMenu}
          onSelect={setActiveMenu}
          onCreate={openCreate}
          createButtonRef={createButtonRef}
        />
        <main className={styles.main}>
          <div className={styles.content}>
            <DashboardHeader
              name={currentUser.name}
              greeting={getGreeting(today)}
              dateLabel={formatKoreanDate(today)}
              shortDate={formatKoreanDateShort(today)}
              dueText={duePhrase(dueSoonTasks)}
              nextTitle={nextWork.title}
              nextWhen={nextClock(nextWork.when)}
              board={board}
              onBoardChange={setBoard}
              query={query}
              onQueryChange={setQuery}
              shortcut={shortcut}
              onShortcut={handleShortcut}
            />
            {content}
          </div>
        </main>

        <Modal
          open={modalOpen}
          title="새 프로젝트"
          description={
            board === "team"
              ? "팀 보드에 공개 프로젝트를 추가합니다."
              : "내 보드에 프로젝트를 추가합니다."
          }
          onClose={closeModal}
        >
          <form className={styles.form} onSubmit={handleCreate}>
            <Input
              label="프로젝트 이름"
              value={draft.name}
              onChange={(event) => {
                setDraft((current) => ({ ...current, name: event.target.value }))
                if (nameError) setNameError("")
              }}
              placeholder="예: 위젯 라이브러리"
              error={nameError}
              autoFocus
            />
            <Input
              label="설명"
              multiline
              value={draft.description}
              onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
              placeholder="어떤 일을 모으는 프로젝트인지 적어 주세요"
            />
            <fieldset className={styles.tones}>
              <legend className={styles.legend}>색상</legend>
              <div className={styles.swatches}>
                {projectTones.map((tone) => (
                  <label key={tone.id} className={styles.tone}>
                    <input
                      type="radio"
                      name="tone"
                      value={tone.id}
                      checked={draft.tone === tone.id}
                      onChange={() => setDraft((current) => ({ ...current, tone: tone.id }))}
                    />
                    <span className={styles.swatch} data-tone={tone.id} />
                    {tone.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className={styles.footer}>
              <Button variant="secondary" onClick={closeModal}>
                취소
              </Button>
              <Button type="submit">만들기</Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>

  )
}
