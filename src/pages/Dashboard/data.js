export const currentUser = {
  name: "지연",
}

export const projectTones = [
  { id: "main", label: "인디고" },
  { id: "sub", label: "라벤더" },
  { id: "mint", label: "민트" },
  { id: "coral", label: "코랄" },
]

export const shortcuts = [
  { id: "ai", label: "AI", icon: "spark", tone: "main" },
  { id: "mind", label: "마인드맵", icon: "mind", tone: "sub" },
  { id: "mail", label: "메일", icon: "mail", tone: "coral" },
  { id: "cal", label: "캘린더", icon: "calendar", tone: "mint" },
  { id: "drive", label: "드라이브", icon: "drive", tone: "amber" },
  { id: "docs", label: "문서", icon: "doc", tone: "main" },
  { id: "approval", label: "결재", icon: "stamp", tone: "sub" },
]

export const overviewMenus = [
  { id: "tasks", label: "전체 업무", icon: "tasks" },
  { id: "gantt", label: "간트차트", icon: "chart" },
  { id: "calendar", label: "캘린더", icon: "calendar" },
  { id: "files", label: "파일함", icon: "file" },
  { id: "bookmarks", label: "북마크", icon: "bookmark" },
  { id: "mentions", label: "나를 언급", icon: "at" },
  { id: "posts", label: "내 게시물", icon: "post" },
  { id: "drafts", label: "임시저장", icon: "draft" },
  { id: "trash", label: "휴지통", icon: "trash" },
]

export const placeholderCopy = {
  gantt: {
    title: "간트차트",
    body: "프로젝트 일정을 막대로 이어 보는 화면입니다.",
  },
  files: {
    title: "파일함",
    body: "공유 파일을 한곳에 모아 두는 화면입니다.",
  },
  posts: {
    title: "내 게시물",
    body: "내가 올린 글을 다시 찾는 화면입니다.",
  },
  drafts: {
    title: "임시저장",
    body: "아직 올리지 않은 글을 보관하는 화면입니다.",
  },
  trash: {
    title: "휴지통",
    body: "삭제한 항목이 잠시 머무는 화면입니다.",
  },
}

export const initialProjects = [
  {
    id: "p1",
    name: "전략컨설팅 과제",
    description: "리테일 ESG 전략과 실행 로드맵",
    tone: "main",
    shared: false,
  },
  {
    id: "p2",
    name: "프로덕트 디자인",
    description: "위젯보드 화면과 컴포넌트",
    tone: "sub",
    shared: false,
  },
  {
    id: "p3",
    name: "회사 위키",
    description: "정보 구조와 문서 정리",
    tone: "mint",
    shared: true,
  },
  {
    id: "p4",
    name: "온보딩 개선",
    description: "신규 입사자 첫 주 여정",
    tone: "coral",
    shared: true,
  },
]

export const initialTasks = {
  p1: [
    { id: "p1-1", code: "WB-214", title: "북유럽 리테일 ESG 진단", progress: 15, status: "진행" },
    { id: "p1-2", code: "WB-221", title: "이해관계자 인터뷰 정리", progress: 46, status: "진행" },
    { id: "p1-3", code: "WB-228", title: "실행 로드맵 초안", progress: 8, status: "대기" },
    { id: "p1-4", code: "WB-233", title: "중간 보고 스토리라인", progress: 72, status: "검토" },
  ],
  p2: [
    { id: "p2-1", code: "WB-118", title: "위젯 카드 여백 정리", progress: 64, status: "진행" },
    { id: "p2-2", code: "WB-124", title: "버튼·입력 상태 정의", progress: 88, status: "검토" },
    { id: "p2-3", code: "WB-131", title: "빈 화면 문구 다듬기", progress: 24, status: "대기" },
    { id: "p2-4", code: "WB-136", title: "캘린더 셀 터치 영역", progress: 51, status: "진행" },
  ],
  p3: [
    { id: "p3-1", code: "WB-301", title: "위키 정보 구조 초안", progress: 38, status: "진행" },
    { id: "p3-2", code: "WB-308", title: "문서 템플릿 3종", progress: 12, status: "대기" },
    { id: "p3-3", code: "WB-314", title: "검색 키워드 정리", progress: 57, status: "검토" },
  ],
  p4: [
    { id: "p4-1", code: "WB-402", title: "첫 주 체크리스트", progress: 81, status: "검토" },
    { id: "p4-2", code: "WB-409", title: "버디 안내 문장", progress: 33, status: "진행" },
    { id: "p4-3", code: "WB-415", title: "도구 계정 요청 흐름", progress: 6, status: "대기" },
  ],
}

export const initialAssigned = [
  { id: "a1", projectId: "p1", title: "인터뷰 질문지 확정", status: "진행", due: "11월 7일", done: false },
  { id: "a2", projectId: "p2", title: "위젯 카드 시안 정리", status: "검토", due: "11월 8일", done: false },
  { id: "a3", projectId: "p1", title: "주간 리스크 메모", status: "대기", due: "11월 10일", done: false },
  { id: "a4", projectId: "p3", title: "위키 첫 화면 스케치", status: "진행", due: "11월 12일", done: false },
  { id: "a5", projectId: "p4", title: "온보딩 메일 초안", status: "대기", due: "11월 13일", done: false },
  { id: "a6", projectId: "p2", title: "버튼 상태 정의", status: "완료", due: "11월 4일", done: true },
]

export const initialBookmarks = [
  { id: "b1", title: "위클리 리포트 아카이브", source: "노션", tag: "문서" },
  { id: "b2", title: "컴포넌트 스펙", source: "피그마", tag: "디자인" },
  { id: "b3", title: "회의록 · 11월 1주차", source: "드라이브", tag: "회의" },
  { id: "b4", title: "온보딩 체크리스트", source: "위키", tag: "운영" },
]

export const initialMentions = [
  {
    id: "m1",
    name: "김민준",
    initial: "김",
    tone: "main",
    text: "전략 초안 2장에 코멘트를 남겼어요.",
    project: "전략컨설팅 과제",
    time: "12분 전",
    board: "mine",
  },
  {
    id: "m2",
    name: "박서연",
    initial: "박",
    tone: "sub",
    text: "카드 라운드는 22로 맞추는 쪽이 좋겠어요.",
    project: "프로덕트 디자인",
    time: "1시간 전",
    board: "mine",
  },
  {
    id: "m3",
    name: "이도윤",
    initial: "이",
    tone: "mint",
    text: "위키 첫 화면에 검색을 더 위로 올려 주세요.",
    project: "회사 위키",
    time: "어제",
    board: "team",
  },
  {
    id: "m4",
    name: "최하은",
    initial: "최",
    tone: "coral",
    text: "온보딩 메일 문장, 더 짧게 다듬어 봤어요.",
    project: "온보딩 개선",
    time: "어제",
    board: "team",
  },
]

export const initialChats = [
  {
    id: "c1",
    name: "디자인 시스템",
    initial: "디",
    tone: "sub",
    preview: "카드 모서리는 22px로 맞출까요?",
    time: "오전 11:20",
    unread: 2,
  },
  {
    id: "c2",
    name: "전략 과제방",
    initial: "전",
    tone: "main",
    preview: "인터뷰 녹취 올렸습니다.",
    time: "어제",
    unread: 0,
  },
  {
    id: "c3",
    name: "운영 알림",
    initial: "운",
    tone: "mint",
    preview: "금요일 회고 일정이 확정됐어요.",
    time: "월요일",
    unread: 1,
  },
]

export const initialEvents = [
  { id: "e1", date: "2026-11-05", title: "위젯보드 스터디", time: "16:00" },
  { id: "e2", date: "2026-11-12", title: "디자인 싱크", time: "10:00" },
  { id: "e3", date: "2026-11-18", title: "과제 중간 점검", time: "15:00" },
  { id: "e4", date: "2026-11-25", title: "스프린트 회고", time: "11:00" },
  { id: "e5", date: "2026-12-02", title: "12월 킥오프", time: "14:00" },
]

export const initialUpdates = [
  { id: "u1", text: "ESG 진단 진행률이 갱신됨", time: "1시간 전" },
  { id: "u2", text: "디자인 싱크 일정이 추가됨", time: "어제" },
  { id: "u3", text: "김민준님이 멘션함", time: "어제" },
]

export const dueSoonTasks = [
  { id: "d1", title: "인터뷰 질문지 확정", due: "내일", project: "전략컨설팅 과제" },
  { id: "d2", title: "위젯 카드 시안 정리", due: "11월 8일", project: "프로덕트 디자인" },
]

export const nextWork = {
  title: "디자인 싱크 자료 정리",
  when: "오늘 14:00",
  detail: "회의 전에 시안 링크를 붙입니다",
}

export const initialNotices = [
  { id: "n1", title: "11월 정기 보안 점검 안내 — 11.07(토) 02:00–06:00 사내 시스템 접속 제한", tag: "필수", time: "오늘" },
  { id: "n2", title: "연말 휴무 일정 초안", tag: "공지", time: "어제" },
  { id: "n3", title: "위젯보드 파일럿 참여 모집", tag: "공지", time: "11월 4일" },
]

export const leaveBalance = "8.5일"

// shortcut: 근무 시간은 화면용 고정값, 출퇴근이 연결되면 교체
export const attendanceToday = {
  status: "근무 중",
  clockIn: "09:02",
  clockOut: "—",
  worked: "1h 14m",
}

export const initialTodayTodos = [
  { id: "td1", title: "인터뷰 질문지 확정", done: false },
  { id: "td2", title: "디자인 싱크 자료 정리", done: false },
  { id: "td3", title: "주간 리스크 메모", done: false },
]

export const todayMeetings = [
  { id: "mt1", time: "14:00", title: "디자인 싱크", place: "온라인" },
  { id: "mt2", time: "16:30", title: "전략 과제 스탠드업", place: "회의실 B" },
]

export const initialApprovals = [
  { id: "ap1", title: "외근 신청 · 11/7", who: "김민준", status: "대기" },
  { id: "ap2", title: "출장 경비", who: "박서연", status: "진행" },
]
