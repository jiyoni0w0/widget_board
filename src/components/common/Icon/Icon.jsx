export default function Icon({ name, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.spark}
    </svg>
  )
}

const paths = {
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16.5 20 20.5" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  chevronLeft: <path d="M15 6 9 12l6 6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8 3.5V7M16 3.5V7" />
    </>
  ),
  check: <path d="M5 12.5 9.2 17 19 7" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.8 5.8l1.5 1.5M16.7 16.7l1.5 1.5M18.2 5.8l-1.5 1.5M7.3 16.7 5.8 18.2" />
    </>
  ),
  bookmark: <path d="M7 4h10a1 1 0 0 1 1 1v15l-6-3.2L6 20V5a1 1 0 0 1 1-1z" />,
  message: <path d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />,
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V5h6v2" />
      <path d="M8 7l.8 12h6.4L16 7" />
    </>
  ),
  file: (
    <>
      <path d="M7 3.5h7L19 8.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
      <path d="M14 3.5V9h5" />
    </>
  ),
  folder: <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-10z" />,
  chart: (
    <>
      <path d="M4 19h16" />
      <path d="M7 16v-5" />
      <path d="M12 16V6" />
      <path d="M17 16v-3" />
    </>
  ),
  tasks: (
    <>
      <path d="M9 7h11M9 12h11M9 17h11" />
      <path d="M4.5 7h.01M4.5 12h.01M4.5 17h.01" />
    </>
  ),
  at: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M15 12.2V13a2 2 0 1 0 1.2 1.8" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="9" r="3" />
      <circle cx="16.2" cy="10" r="2.2" />
      <path d="M4.2 19c.5-2.5 2.5-4 4.8-4s4.3 1.5 4.8 4" />
      <path d="M14 15.3c1.5-.4 3.1.3 4 2.2" />
    </>
  ),
  spark: <path d="M12 3.2 13.7 8.6 19.2 10 13.7 11.6 12 17l-1.7-5.4L4.8 10l5.5-1.4L12 3.2z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  drive: <path d="M8 4.5h8l4 6.5-4 6.5H8L4 11l4-6.5z" />,
  doc: (
    <>
      <path d="M7 3.5h7L19 8.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
      <path d="M14 3.5V9h5M9 13h6M9 16.5h4" />
    </>
  ),
  stamp: (
    <>
      <circle cx="12" cy="10" r="4.5" />
      <path d="M8.5 20.5h7M9.2 17.5l1-3h3.6l1 3" />
    </>
  ),
  mind: (
    <>
      <circle cx="6" cy="12" r="2.1" />
      <circle cx="16" cy="7" r="2.1" />
      <circle cx="16" cy="17" r="2.1" />
      <path d="M8 12h6M8.2 11.2 14 8.2M8.2 12.8 14 15.8" />
    </>
  ),
  post: (
    <>
      <rect x="4" y="5" width="16" height="12" rx="2" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
  draft: (
    <>
      <path d="M4 20h4L18 10l-4-4L4 16v4z" />
      <path d="m13 7 4 4" />
    </>
  ),
  pin: (
    <>
      <path d="M9 4.5h6l-1 6 2 2v1.5H8V12.5l2-2-1-6z" />
      <path d="M12 14v6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8v4.5l3 2" />
    </>
  ),
  dashboard: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.6" />
      <rect x="13" y="4" width="7" height="7" rx="1.6" />
      <rect x="4" y="13" width="16" height="7" rx="1.6" />
    </>
  ),
}
