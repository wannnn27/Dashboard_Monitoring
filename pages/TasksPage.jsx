// pages/TasksPage.jsx
import { useState, useEffect, useRef } from "react";
import { Card, ProgressBar, Button, AnimatedBarChart, AnimatedNumber } from "../components/ui";
import { TASKS, TASK_STATS } from "../lib/data";
import { 
  ClipboardList, 
  CheckCircle, 
  Clock, 
  Calendar,
  MoreVertical,
  ChevronDown,
  ExternalLink,
  Cpu,
  GripVertical,
  Plus,
  CalendarDays,
  X,
  ChevronLeft,
  ChevronRight,
  List,
  LayoutGrid,
  Leaf,
  Droplets,
  AlertCircle
} from "lucide-react";

/* ── Calendar Picker ── */
function CalendarPicker({ selectedDate, onSelect, onClose }) {
  const [viewMonth, setViewMonth] = useState(selectedDate ? new Date(selectedDate) : new Date());

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setViewMonth(new Date(year, month + 1, 1));

  const isSelected = (day) => {
    if (!selectedDate) return false;
    const d = new Date(selectedDate);
    return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
  };

  const isToday = (day) => {
    const t = new Date();
    return t.getFullYear() === year && t.getMonth() === month && t.getDate() === day;
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 90 }} />
      <div style={{
        position: "absolute", top: "calc(100% + 8px)", left: 0,
        background: "white", borderRadius: 20, border: "1px solid var(--gray-100)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12)", zIndex: 100,
        padding: 20, width: 280,
        animation: "slideUpFade 0.2s ease",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <button onClick={prevMonth} style={{ width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-400)", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--gray-50)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          ><ChevronLeft size={16} /></button>
          <span style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)" }}>{monthNames[month]} {year}</span>
          <button onClick={nextMonth} style={{ width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-400)", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--gray-50)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          ><ChevronRight size={16} /></button>
        </div>

        {/* Day names */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 6 }}>
          {dayNames.map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: "var(--gray-400)", padding: "4px 0", textTransform: "uppercase", letterSpacing: "0.04em" }}>{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {cells.map((day, i) => (
            <div key={i}>
              {day ? (
                <button
                  onClick={() => { onSelect(new Date(year, month, day)); onClose(); }}
                  style={{
                    width: "100%", aspectRatio: "1", borderRadius: 10, fontSize: 12,
                    fontWeight: isToday(day) ? 800 : 600,
                    background: isSelected(day) ? "var(--green-500)" : "transparent",
                    color: isSelected(day) ? "white" : isToday(day) ? "var(--green-600)" : "var(--gray-700)",
                    border: isToday(day) && !isSelected(day) ? "1.5px solid var(--green-300)" : "1px solid transparent",
                    transition: "all 0.15s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => { if (!isSelected(day)) e.currentTarget.style.background = "var(--green-50)"; }}
                  onMouseLeave={e => { if (!isSelected(day)) e.currentTarget.style.background = "transparent"; }}
                >{day}</button>
              ) : <div />}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--gray-100)", display: "flex", justifyContent: "space-between", gap: 8 }}>
          <button onClick={() => { onSelect(new Date()); onClose(); }} style={{
            flex: 1, padding: "8px", borderRadius: 10, fontSize: 11, fontWeight: 700,
            background: "var(--green-50)", color: "var(--green-700)", border: "1px solid var(--green-200)",
            transition: "all 0.2s", cursor: "pointer",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--green-100)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--green-50)"}
          >Today</button>
          <button onClick={onClose} style={{
            flex: 1, padding: "8px", borderRadius: 10, fontSize: 11, fontWeight: 700,
            background: "var(--gray-50)", color: "var(--gray-600)", border: "1px solid var(--gray-100)",
            transition: "all 0.2s", cursor: "pointer",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--gray-100)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--gray-50)"}
          >Cancel</button>
        </div>
      </div>
    </>
  );
}

/* ── Add Task Modal ── */
function AddTaskModal({ column, onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState(() => {
    const d = new Date();
    const h = d.getHours();
    const h1 = h % 12 || 12;
    const h2 = (h + 1) % 12 || 12;
    const ampm1 = h >= 12 ? 'PM' : 'AM';
    const ampm2 = (h + 1) >= 24 || (h + 1) % 24 >= 12 ? 'PM' : 'AM';
    return `${h1.toString().padStart(2, '0')}:00 ${ampm1} – ${h2.toString().padStart(2, '0')}:00 ${ampm2}`;
  });
  const [due, setDue] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  });
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), desc: desc.trim() || "No description provided.", time, due });
    onClose();
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 200, backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        background: "white", borderRadius: 24, padding: 32, width: 440,
        zIndex: 201, boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
        animation: "slideUpFade 0.25s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--gray-900)" }}>Add New Task</h3>
            <p style={{ fontSize: 12, color: "var(--gray-400)", marginTop: 2, fontWeight: 500 }}>Adding to <span style={{ color: "var(--green-600)", fontWeight: 700 }}>{column}</span></p>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 12, background: "var(--gray-50)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-400)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--gray-100)"; e.currentTarget.style.color = "var(--gray-700)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--gray-50)"; e.currentTarget.style.color = "var(--gray-400)"; }}
          ><X size={18} /></button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>Task Title *</label>
            <input
              ref={inputRef}
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="e.g. Soil pH Testing"
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 14, fontSize: 14, fontWeight: 600,
                border: "1.5px solid var(--gray-200)", background: "var(--gray-50)",
                color: "var(--gray-900)", outline: "none", transition: "all 0.2s", fontFamily: "inherit",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = "var(--green-400)"; e.currentTarget.style.background = "white"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,197,94,0.1)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "var(--gray-200)"; e.currentTarget.style.background = "var(--gray-50)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>Description</label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Brief task description..."
              rows={3}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 14, fontSize: 13, fontWeight: 500,
                border: "1.5px solid var(--gray-200)", background: "var(--gray-50)",
                color: "var(--gray-700)", outline: "none", resize: "none", transition: "all 0.2s", fontFamily: "inherit",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = "var(--green-400)"; e.currentTarget.style.background = "white"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,197,94,0.1)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "var(--gray-200)"; e.currentTarget.style.background = "var(--gray-50)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>Time</label>
              <input
                value={time}
                onChange={e => setTime(e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 12, fontSize: 12, fontWeight: 600,
                  border: "1.5px solid var(--gray-200)", background: "var(--gray-50)",
                  color: "var(--gray-700)", outline: "none", transition: "all 0.2s", fontFamily: "inherit",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--green-400)"; e.currentTarget.style.background = "white"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "var(--gray-200)"; e.currentTarget.style.background = "var(--gray-50)"; }}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>Due Date</label>
              <input
                value={due}
                onChange={e => setDue(e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 12, fontSize: 12, fontWeight: 600,
                  border: "1.5px solid var(--gray-200)", background: "var(--gray-50)",
                  color: "var(--gray-700)", outline: "none", transition: "all 0.2s", fontFamily: "inherit",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--green-400)"; e.currentTarget.style.background = "white"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "var(--gray-200)"; e.currentTarget.style.background = "var(--gray-50)"; }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button onClick={onClose} style={{
            flex: 1, height: 46, borderRadius: 14, border: "1.5px solid var(--gray-200)",
            fontSize: 13, fontWeight: 700, color: "var(--gray-600)", background: "white",
            cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--gray-50)"}
          onMouseLeave={e => e.currentTarget.style.background = "white"}
          >Cancel</button>
          <button onClick={handleSubmit} style={{
            flex: 2, height: 46, borderRadius: 14, border: "none",
            fontSize: 13, fontWeight: 800, color: "white",
            background: title.trim() ? "var(--green-500)" : "var(--gray-200)",
            cursor: title.trim() ? "pointer" : "not-allowed",
            transition: "all 0.2s",
            boxShadow: title.trim() ? "0 4px 14px rgba(34,197,94,0.25)" : "none",
          }}
          onMouseEnter={e => { if (title.trim()) e.currentTarget.style.background = "var(--green-600)"; }}
          onMouseLeave={e => { if (title.trim()) e.currentTarget.style.background = "var(--green-500)"; }}
          >+ Add Task</button>
        </div>
      </div>
    </>
  );
}

function StatCard({ icon: Icon, value, title, subtext, delay = 0, accentColor }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Card style={{
      padding: "26px 24px", display: "flex", gap: "20px", alignItems: "center",
      animation: `staggerUp 0.5s ease ${delay}ms both`, opacity: 0,
      transition: "all 0.3s ease",
      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      boxShadow: isHovered ? "var(--shadow-md)" : "var(--shadow-sm)",
      cursor: "default",
      borderColor: isHovered ? (accentColor ? `${accentColor}30` : "var(--green-100)") : "var(--gray-100)",
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        width: 54, height: 54, borderRadius: 16,
        background: accentColor ? `${accentColor}10` : "var(--gray-50)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: accentColor || "var(--gray-700)",
        transition: "all 0.3s ease",
        transform: isHovered ? "scale(1.08)" : "scale(1)",
      }}>
        <Icon size={24} />
      </div>
      <div>
        <h4 style={{ fontSize: 32, fontWeight: 800, color: "var(--gray-900)", lineHeight: 1, letterSpacing: "-0.04em" }}>
          <AnimatedNumber value={value} duration={700 + delay} />
        </h4>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-700)", marginTop: 4 }}>{title}</p>
        <p style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 2, fontWeight: 500 }}>{subtext}</p>
      </div>
    </Card>
  );
}

function KanbanCard({ task, borderColor, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Card style={{
      padding: 22,
      borderLeft: `4px solid ${borderColor}`,
      borderRadius: 20,
      display: "flex", flexDirection: "column", gap: 12,
      cursor: "grab",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: isHovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
      boxShadow: isHovered ? "var(--shadow-md)" : "var(--shadow-sm)",
      borderColor: isHovered ? borderColor : "var(--gray-100)",
      borderLeftColor: borderColor,
      animation: `staggerUp 0.4s ease ${index * 80}ms both`,
      opacity: 0,
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flex: 1 }}>
          {isHovered && <GripVertical size={16} color="var(--gray-300)" style={{ marginTop: 2, animation: "fadeIn 0.2s ease" }} />}
          <h5 style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)", lineHeight: 1.4, flex: 1, paddingRight: 8 }}>{task.title}</h5>
        </div>
        <button style={{ color: "var(--gray-300)", padding: 4, borderRadius: 6, background: isHovered ? "var(--gray-50)" : "transparent" }}>
          <MoreVertical size={16} />
        </button>
      </div>
      <p style={{ fontSize: 12, color: "var(--gray-500)", lineHeight: 1.6, fontWeight: 500 }}>{task.desc}</p>
      <div style={{ display: "flex", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--gray-400)", fontWeight: 600, background: "var(--gray-50)", padding: "4px 10px", borderRadius: 8 }}>
          <Clock size={11} strokeWidth={2.5} /> {task.time}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--gray-400)", fontWeight: 600, background: "var(--gray-50)", padding: "4px 10px", borderRadius: 8 }}>
          <Calendar size={11} strokeWidth={2.5} /> {task.due}
        </div>
      </div>
      {task.pct != null && (
        <div style={{ marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: "var(--gray-400)" }}>Progress</span>
            <span style={{ fontSize: 11, fontWeight: 900, color: task.pct > 80 ? "var(--green-600)" : "var(--gray-900)", background: task.pct > 80 ? "var(--green-50)" : "var(--gray-50)", padding: "2px 8px", borderRadius: 6 }}>{task.pct}%</span>
          </div>
          <ProgressBar value={task.pct} color={task.pct > 80 ? "var(--green-500)" : "var(--green-400)"} height={6} />
        </div>
      )}
    </Card>
  );
}

/* List view row */
function ListRow({ task, colLabel, borderColor, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "grid", gridTemplateColumns: "1fr 140px 120px 100px 80px",
        gap: 12, alignItems: "center",
        padding: "14px 16px",
        borderRadius: 14,
        background: isHovered ? "var(--gray-50)" : "white",
        border: `1px solid ${isHovered ? "var(--green-100)" : "var(--gray-100)"}`,
        borderLeft: `4px solid ${borderColor}`,
        transition: "all 0.2s ease",
        cursor: "pointer",
        animation: `staggerUp 0.4s ease ${index * 60}ms both`,
        opacity: 0,
      }}
    >
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-900)" }}>{task.title}</p>
        <p style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 2, fontWeight: 500 }}>{task.desc}</p>
      </div>
      <span style={{ fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>{task.time}</span>
      <span style={{ fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>{task.due}</span>
      <span style={{
        fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 8,
        background: borderColor + "15", color: borderColor, display: "inline-block",
      }}>{colLabel}</span>
      <div>
        {task.pct != null ? (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <ProgressBar value={task.pct} height={5} color={task.pct > 80 ? "var(--green-500)" : "#f59e0b"} style={{ flex: 1 }} />
            <span style={{ fontSize: 10, fontWeight: 800, color: "var(--gray-600)", whiteSpace: "nowrap" }}>{task.pct}%</span>
          </div>
        ) : <span style={{ fontSize: 11, color: "var(--gray-300)" }}>—</span>}
      </div>
    </div>
  );
}

function GaugeProgress({ value }) {
  const cx = 80, cy = 72, r = 56;
  const total = Math.PI * r;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const segments = [
    { p: 0.65, color: "#16a34a", label: "Completed" },
    { p: 0.12, color: "#4ade80", label: "In Progress" },
    { p: 0.08, color: "#fcd34d", label: "At Risk" },
    { p: 0.15, color: "#e5e7eb", label: "Pending" },
  ];
  let acc = 0;
  return (
    <div style={{ position: "relative", width: "100%", height: 120, overflow: "hidden" }}>
      <svg viewBox="0 0 160 84" style={{ width: "100%", position: "absolute", bottom: 0 }}>
        {segments.map((seg, i) => {
          const dash = seg.p * total;
          const el = (
            <path key={i}
              d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
              fill="none" stroke={seg.color} strokeWidth={14}
              strokeDasharray={`${dash} ${total}`}
              strokeDashoffset={mounted ? -acc : total}
              strokeLinecap="round"
              style={{ transition: `stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${i * 150}ms` }}
            />
          );
          acc += dash; return el;
        })}
      </svg>
      <div style={{ position: "absolute", bottom: 2, width: "100%", textAlign: "center" }}>
        <h4 style={{ fontSize: 36, fontWeight: 800, color: "var(--gray-900)", lineHeight: 1 }}>
          <AnimatedNumber value={value} duration={1200} />%
        </h4>
        <p style={{ fontSize: 10, fontWeight: 700, color: "var(--gray-400)", marginTop: 4 }}>Harvest Completion</p>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const [activeView, setActiveView] = useState("board");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [tasks, setTasks] = useState(TASKS);
  const [addTaskCol, setAddTaskCol] = useState(null); // nama kolom saat modal buka

  const formatDate = (date) => {
    if (!date) return "Pilih Tanggal";
    const days = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];
    const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const handleAddTask = (col, newTask) => {
    setTasks(prev => ({
      ...prev,
      [col]: [...(prev[col] || []), newTask]
    }));
  };

  const allTasksList = Object.entries(tasks).flatMap(([col, list]) => 
    list.map(t => ({ ...t, col }))
  );

  const irrigationData = [
    { label: "Sen", value: 50, tooltip: "50 mnt" },
    { label: "Sel", value: 68, tooltip: "68 mnt" },
    { label: "Rab", value: 48, tooltip: "48 mnt" },
    { label: "Kam", value: 85, tooltip: "85 mnt" },
    { label: "Jum", value: 60, tooltip: "60 mnt" },
  ];

  const colColors = { "Harus Dikerjakan": "#94a3b8", "Sedang Berjalan": "#f59e0b", "Dalam Peninjauan": "#22c55e" };
  const colBgColors = { "Harus Dikerjakan": "#f8fafc", "Sedang Berjalan": "#fffbeb", "Dalam Peninjauan": "#f0fdf4" };

  return (
    <div className="page-transition" style={{ display: "flex", flexDirection: "column", gap: 28 }}>

      {/* Modal Tambah Tugas */}
      {addTaskCol && (
        <AddTaskModal
          column={addTaskCol}
          onAdd={(task) => handleAddTask(addTaskCol, task)}
          onClose={() => setAddTaskCol(null)}
        />
      )}

      {/* ── HEADER ATAS ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--gray-900)", letterSpacing: "-0.03em" }}>Manajemen Tugas</h2>
          <p style={{ fontSize: 13, color: "var(--gray-400)", fontWeight: 500, marginTop: 4 }}>
            Lacak, kelola, dan atur semua tugas pertanian dalam satu tempat.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {/* Calendar Picker Button */}
          <div style={{ position: "relative" }}>
            <Button 
              variant="outline" 
              onClick={() => setShowCalendar(v => !v)}
              style={{ 
                borderRadius: 14, height: 44, padding: "0 18px", gap: 8, fontSize: 13, fontWeight: 700,
                background: showCalendar ? "var(--green-50)" : "white",
                borderColor: showCalendar ? "var(--green-300)" : undefined,
                color: showCalendar ? "var(--green-700)" : undefined,
              }}
            >
              <CalendarDays size={16} /> {formatDate(selectedDate)}
            </Button>
            {showCalendar && (
              <CalendarPicker
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
                onClose={() => setShowCalendar(false)}
              />
            )}
          </div>
          <Button variant="dark" style={{ borderRadius: 14, height: 44, padding: "0 22px", gap: 8, fontSize: 13, fontWeight: 700 }}>
            <ExternalLink size={16} /> Ekspor
          </Button>
        </div>
      </div>

      {/* ── BARIS STATISTIK ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        <StatCard icon={ClipboardList} value={allTasksList.length} title="Ikhtisar Tugas" subtext="Total tugas dijadwalkan hari ini" delay={0} accentColor="#6366f1" />
        <StatCard icon={CheckCircle} value={3} title="Tugas Selesai" subtext="Tugas yang berhasil diselesaikan sejauh ini" delay={80} accentColor="#22c55e" />
        <StatCard icon={Clock} value={tasks["Sedang Berjalan"]?.length || 0} title="Sedang Berjalan" subtext="Tugas yang sedang dilakukan saat ini" delay={160} accentColor="#f59e0b" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, alignItems: "flex-start" }}>

        {/* ── BAGIAN UTAMA ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Bar Filter */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ background: "var(--gray-50)", padding: 5, borderRadius: 14, display: "flex", border: "1px solid var(--gray-100)" }}>
              {[
                { key: "board", label: "Papan", Icon: LayoutGrid },
                { key: "list",  label: "Daftar",  Icon: List },
              ].map(({ key, label, Icon }) => (
                <button key={key} onClick={() => setActiveView(key)} style={{
                  padding: "10px 22px", borderRadius: 10, fontSize: 13, fontWeight: 800, transition: "all 0.25s",
                  background: activeView === key ? "white" : "transparent",
                  color: activeView === key ? "var(--gray-900)" : "var(--gray-400)",
                  boxShadow: activeView === key ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                  transform: activeView === key ? "scale(1.02)" : "scale(1)",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>

            <button style={{
              height: 44, padding: "0 18px", background: "white", borderRadius: 14, border: "1.5px solid var(--gray-100)",
              display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 700, color: "var(--gray-600)",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green-200)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--gray-100)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <Calendar size={16} color="var(--gray-400)" /> {formatDate(selectedDate)} <ChevronDown size={16} color="var(--gray-300)" />
            </button>
          </div>

          {/* ── TAMPILAN PAPAN ── */}
          {activeView === "board" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {Object.entries(tasks).map(([col, list], colIdx) => (
                <div key={col} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "8px 12px",
                    background: colBgColors[col],
                    borderRadius: 12,
                    border: `1px solid ${colColors[col]}20`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: colColors[col] }} />
                      <h4 style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-800)" }}>{col}</h4>
                      <span style={{
                        width: 22, height: 22, background: "white", borderRadius: 8,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 800, color: "var(--gray-500)",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      }}>{list.length}</span>
                    </div>
                    <button style={{ color: "var(--gray-300)", padding: 4, borderRadius: 6, transition: "all 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "white"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    ><MoreVertical size={16} /></button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {list.map((t, i) => <KanbanCard key={i} task={t} borderColor={colColors[col]} index={colIdx * 3 + i} />)}
                    <button
                      onClick={() => setAddTaskCol(col)}
                      style={{
                        width: "100%", padding: "14px", borderRadius: 16, border: "2px dashed var(--gray-100)",
                        color: "var(--gray-400)", fontWeight: 700, fontSize: 13, background: "transparent",
                        transition: "all 0.25s",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green-300)"; e.currentTarget.style.color = "var(--green-600)"; e.currentTarget.style.background = "var(--green-50)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--gray-100)"; e.currentTarget.style.color = "var(--gray-400)"; e.currentTarget.style.background = "transparent"; }}
                    ><Plus size={16} /> Tambah Tugas</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── TAMPILAN DAFTAR ── */}
          {activeView === "list" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, animation: "slideUpFade 0.3s ease" }}>
              {/* Header */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 140px 120px 100px 80px",
                gap: 12, padding: "10px 16px",
                borderRadius: 12, background: "var(--gray-50)",
                border: "1px solid var(--gray-100)",
              }}>
                {["Tugas", "Waktu", "Batas Waktu", "Status", "Progres"].map(h => (
                  <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
                ))}
              </div>
              {allTasksList.map((t, i) => (
                <ListRow key={i} task={t} colLabel={t.col} borderColor={colColors[t.col]} index={i} />
              ))}

              {/* Baris Tambah Tugas */}
              <button
                onClick={() => setAddTaskCol("Harus Dikerjakan")}
                style={{
                  width: "100%", padding: "14px 16px", borderRadius: 14, border: "2px dashed var(--gray-100)",
                  color: "var(--gray-400)", fontWeight: 700, fontSize: 13, background: "transparent",
                  transition: "all 0.25s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  marginTop: 4,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green-300)"; e.currentTarget.style.color = "var(--green-600)"; e.currentTarget.style.background = "var(--green-50)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--gray-100)"; e.currentTarget.style.color = "var(--gray-400)"; e.currentTarget.style.background = "transparent"; }}
              ><Plus size={16} /> Tambah Tugas Baru</button>
            </div>
          )}
        </div>

        {/* ── ANALITIK KANAN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Progres Panen */}
          <Card style={{ padding: 24, borderRadius: 24, animation: "staggerUp 0.5s ease 100ms both", opacity: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: "var(--gray-900)" }}>Progres Panen</h4>
              <button style={{ width: 28, height: 28, background: "var(--gray-50)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-400)", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--gray-100)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--gray-50)"}
              ><MoreVertical size={14} /></button>
            </div>
            <GaugeProgress value={81} />
            <div style={{ gridTemplateColumns: "1fr 1fr", gap: "10px 4px", marginTop: 20, display: "grid" }}>
              {[
                { c: "#16a34a", l: "Selesai", v: "65%" },
                { c: "#4ade80", l: "Berjalan", v: "12%" },
                { c: "#fcd34d", l: "Berisiko", v: "8%" },
                { c: "#e5e7eb", l: "Tertunda", v: "15%" }
              ].map(x => (
                <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 4, background: x.c, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--gray-400)", flex: 1 }}>{x.l}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "var(--gray-600)" }}>{x.v}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Diagram Irigasi */}
          <Card style={{ padding: 24, borderRadius: 24, animation: "staggerUp 0.5s ease 200ms both", opacity: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: "var(--gray-900)" }}>Waktu Irigasi</h4>
                <p style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 2, fontWeight: 500 }}>Penggunaan air mingguan (menit)</p>
              </div>
              <button style={{ width: 28, height: 28, background: "var(--gray-50)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-400)", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--gray-100)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--gray-50)"}
              ><MoreVertical size={14} /></button>
            </div>

            {/* Baris statistik */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20, marginTop: 10 }}>
              {[
                { label: "Rata", value: "62 mnt" },
                { label: "Puncak", value: "Kam" },
                { label: "Total", value: "5.2j" },
              ].map(s => (
                <div key={s.label} style={{ flex: 1, background: "var(--green-50)", borderRadius: 10, padding: "8px 10px", textAlign: "center" }}>
                  <p style={{ fontSize: 10, color: "var(--green-600)", fontWeight: 700, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</p>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "var(--green-800)" }}>{s.value}</p>
                </div>
              ))}
            </div>

            <AnimatedBarChart
              data={irrigationData}
              height={140}
              barColor="var(--green-300)"
              activeColor="var(--green-600)"
            />

            {/* Petunjuk sumbu Y */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <span style={{ fontSize: 10, color: "var(--gray-300)", fontWeight: 600 }}>0 mnt</span>
              <span style={{ fontSize: 10, color: "var(--gray-400)", fontWeight: 600 }}>Puncak 85 mnt (Kam)</span>
            </div>
          </Card>

          {/* Banner AI */}
          <div style={{
            background: "linear-gradient(145deg, var(--green-600) 0%, var(--green-500) 50%, #34d399 100%)",
            borderRadius: 24, padding: "24px", position: "relative", overflow: "hidden",
            boxShadow: "0 16px 40px rgba(34,197,94,0.25)",
            animation: "staggerUp 0.5s ease 300ms both",
            opacity: 0,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(34,197,94,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(34,197,94,0.25)"; }}
          >
            {/* Lingkaran dekoratif */}
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
            <div style={{ position: "absolute", bottom: -30, right: 40, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
            <div style={{ position: "absolute", top: 40, right: 20, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Cpu size={18} color="white" />
              <h4 style={{ color: "white", fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>Update Tugas Cerdas</h4>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 500, lineHeight: 1.6, marginTop: 6 }}>
              AI melacak, menganalisis, dan memperbarui status tugas untuk meningkatkan efisiensi alur kerja.
            </p>

            {/* Baris statistik */}
            <div style={{ display: "flex", gap: 8, marginTop: 16, marginBottom: 20 }}>
              {[
                { label: "Tugas Selesai", val: "3/6" },
                { label: "Tepat Waktu", val: "100%" },
                { label: "Skor AI", val: "A+" },
              ].map(s => (
                <div key={s.label} style={{
                  flex: 1, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
                  borderRadius: 10, padding: "8px", textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 600, marginBottom: 2 }}>{s.label}</p>
                  <p style={{ fontSize: 14, fontWeight: 800, color: "white" }}>{s.val}</p>
                </div>
              ))}
            </div>

            <button style={{
              height: 40, padding: "0 22px", background: "white", borderRadius: 12,
              color: "var(--green-600)", fontWeight: 800, fontSize: 12, border: "none",
              transition: "all 0.25s",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >Perbarui Sekarang →</button>
          </div>
        </div>

      </div>
    </div>
  );
}
