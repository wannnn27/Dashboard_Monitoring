// pages/TasksPage.jsx
import { useState, useEffect } from "react";
import { Card, ProgressBar, Button, AnimatedBarChart, AnimatedAreaChart, AnimatedNumber } from "../components/ui";
import { TASKS, TASK_STATS } from "../lib/data";
import { 
  ClipboardList, 
  CheckCircle, 
  Clock, 
  Calendar,
  MoreVertical,
  ChevronDown,
  ExternalLink,
  Sparkles,
  GripVertical,
  Plus,
  CalendarDays
} from "lucide-react";

const INITIAL_TASKS = {
  "Harus Dikerjakan": [
    { id: 1, title: "Aerasi Tanah",     desc: "Aerasi tanaman dengan hati-hati tanpa merusak akar", time: "02:00 – 03:00 PM", due: "10 Sep, 2024" },
    { id: 2, title: "Pembaruan Mulsa",  desc: "Buang mulsa lama, tambahkan lapisan segar ke tanah",  time: "03:00 – 03:30 PM", due: "10 Sep, 2024" },
  ],
  "Sedang Berjalan": [
    { id: 3, title: "Inspeksi Saluran Tetes", desc: "Periksa saluran tetes dari kebocoran dan penyumbatan", time: "02:00 – 03:00 PM", due: "10 Sep, 2024", pct: 40 },
    { id: 4, title: "Pencampuran Nutrisi",     desc: "Siapkan larutan nutrisi untuk tempat tanam",         time: "02:00 – 03:00 PM", due: "10 Sep, 2024", pct: 60 },
  ],
  "Dalam Peninjauan": [
    { id: 5, title: "Kalibrasi Sensor Iklim", desc: "Kalibrasi sensor suhu dan kelembapan secara akurat.", time: "02:00 – 03:00 PM", due: "10 Sep, 2024", pct: 92 },
  ],
};

function StatCard({ icon: Icon, value, title, subtext, delay = 0, accentColor }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card style={{ 
      padding: "26px 24px", display: "flex", gap: "20px", alignItems: "center", 
      boxShadow: "var(--shadow-sm)",
      animation: `staggerUp 0.5s ease ${delay}ms both`,
      opacity: 0,
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
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <Card style={{ 
      padding: 22, 
      borderLeft: `4px solid ${borderColor}`, 
      borderRadius: 20, 
      display: "flex", 
      flexDirection: "column", 
      gap: 12,
      boxShadow: isHovered ? "var(--shadow-md)" : "var(--shadow-sm)",
      cursor: "grab",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: isHovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
      borderColor: isHovered ? `${borderColor}` : "var(--gray-100)",
      borderLeftColor: borderColor,
      animation: `staggerUp 0.4s ease ${index * 80}ms both`,
      opacity: 0,
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flex: 1 }}>
          {isHovered && (
            <GripVertical size={16} color="var(--gray-300)" style={{ marginTop: 2, animation: "fadeIn 0.2s ease" }} />
          )}
          <h5 style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)", lineHeight: 1.4, flex: 1, paddingRight: 8 }}>{task.title}</h5>
        </div>
        <button 
          style={{ 
            color: "var(--gray-300)", padding: 4, borderRadius: 6,
            transition: "all 0.2s",
            background: isHovered ? "var(--gray-50)" : "transparent",
          }}
        >
          <MoreVertical size={16} />
        </button>
      </div>
      <p style={{ fontSize: 12, color: "var(--gray-500)", lineHeight: 1.6, fontWeight: 500 }}>{task.desc}</p>
      
      <div style={{ display: "flex", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
        <div style={{ 
          display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--gray-400)", fontWeight: 600,
          background: "var(--gray-50)", padding: "4px 10px", borderRadius: 8,
        }}>
          <Clock size={11} strokeWidth={2.5} /> {task.time}
        </div>
        <div style={{ 
          display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--gray-400)", fontWeight: 600,
          background: "var(--gray-50)", padding: "4px 10px", borderRadius: 8,
        }}>
          <Calendar size={11} strokeWidth={2.5} /> {task.due}
        </div>
      </div>

      {task.pct != null && (
        <div style={{ marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: "var(--gray-400)" }}>Kemajuan</span>
            <span style={{ 
              fontSize: 11, fontWeight: 900, 
              color: task.pct > 80 ? "var(--green-600)" : "var(--gray-900)",
              background: task.pct > 80 ? "var(--green-50)" : "var(--gray-50)",
              padding: "2px 8px",
              borderRadius: 6,
            }}>{task.pct}%</span>
          </div>
          <ProgressBar value={task.pct} color={task.pct > 80 ? "var(--green-500)" : "var(--green-400)"} height={6} />
        </div>
      )}
    </Card>
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
    { p: 0.65, color: "#16a34a", label: "Selesai" },
    { p: 0.12, color: "#4ade80", label: "Sedang Berjalan" },
    { p: 0.08, color: "#fcd34d", label: "Berisiko" },
    { p: 0.15, color: "#e5e7eb", label: "Tertunda" },
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
              style={{ 
                transition: `stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${i * 150}ms`,
              }}
            />
          );
          acc += dash; return el;
        })}
      </svg>
      <div style={{ position: "absolute", bottom: 2, width: "100%", textAlign: "center" }}>
        <h4 style={{ fontSize: 36, fontWeight: 800, color: "var(--gray-900)", lineHeight: 1 }}>
          <AnimatedNumber value={value} duration={1200} />%
        </h4>
        <p style={{ fontSize: 10, fontWeight: 700, color: "var(--gray-400)", marginTop: 4 }}>Penyelesaian Panen</p>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const [activeView, setActiveView] = useState("board");
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Sen, 22 Jul");
  
  const irrigationData = [
    { label: "Sen", value: 50, tooltip: "50 mnt" },
    { label: "Sel", value: 68, tooltip: "68 mnt" },
    { label: "Rab", value: 48, tooltip: "48 mnt" },
    { label: "Kam", value: 85, tooltip: "85 mnt" },
    { label: "Jum", value: 60, tooltip: "60 mnt" },
  ];

  const handleAddTask = (column) => {
    const newTask = {
      id: Date.now(),
      title: "Tugas Baru",
      desc: "Deskripsi tugas baru yang akan dilakukan.",
      time: "09:00 – 10:00 AM",
      due: "22 Jul, 2024",
      pct: column === "Sedang Berjalan" ? 0 : null
    };
    setTasks(prev => ({
      ...prev,
      [column]: [...prev[column], newTask]
    }));
  };

  const allTasksList = Object.entries(tasks).flatMap(([col, list]) => 
    list.map(t => ({ ...t, column: col }))
  );

  return (
    <div className="page-transition" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      
      {/* ── TOP HDR ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--gray-900)", letterSpacing: "-0.03em" }}>Manajemen Tugas</h2>
          <p style={{ fontSize: 13, color: "var(--gray-400)", fontWeight: 500, marginTop: 4 }}>
            Pantau, kelola, dan atur semua tugas pertanian dalam satu tempat.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="outline" style={{ borderRadius: 14, height: 44, padding: "0 18px", gap: 8, fontSize: 13, fontWeight: 700 }}>
            <CalendarDays size={16} /> Minggu Ini
          </Button>
          <Button variant="dark" style={{ borderRadius: 14, height: 44, padding: "0 22px", gap: 8, fontSize: 13, fontWeight: 700 }}>
            <ExternalLink size={16} /> Ekspor
          </Button>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <StatCard icon={ClipboardList} value={6} title="Ikhtisar Tugas" subtext="Total tugas dijadwalkan hari ini" delay={0} accentColor="#6366f1" />
        <StatCard icon={CheckCircle} value={3} title="Tugas Selesai" subtext="Tugas yang berhasil diselesaikan" delay={80} accentColor="#22c55e" />
        <StatCard icon={Clock} value={2} title="Sedang Berjalan" subtext="Tugas yang sedang dilakukan sekarang" delay={160} accentColor="#f59e0b" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, alignItems: "flex-start" }}>
        
        {/* ── KANBAN SECTION ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* Filters Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
             <div style={{ background: "var(--gray-50)", padding: 5, borderRadius: 14, display: "flex", border: "1px solid var(--gray-100)" }}>
                {["Papan", "Daftar"].map(v => (
                  <button key={v} onClick={() => setActiveView(v === "Papan" ? "board" : "list")} style={{
                    padding: "10px 22px", borderRadius: 10, fontSize: 13, fontWeight: 800, transition: "all 0.25s",
                    background: activeView === (v === "Papan" ? "board" : "list") ? "white" : "transparent",
                    color: activeView === (v === "Papan" ? "board" : "list") ? "var(--gray-900)" : "var(--gray-400)",
                    boxShadow: activeView === (v === "Papan" ? "board" : "list") ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                    transform: activeView === (v === "Papan" ? "board" : "list") ? "scale(1.02)" : "scale(1)",
                  }}>{v}</button>
                ))}
             </div>
             
             <div style={{ position: "relative" }}>
               <button style={{ 
                  height: 44, padding: "0 18px", background: "white", borderRadius: 14, border: "1.5px solid var(--gray-100)",
                  display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 700, color: "var(--gray-600)",
                  transition: "all 0.25s",
                  cursor: "pointer",
               }}
               onClick={() => setShowDatePicker(!showDatePicker)}
               onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green-200)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
               onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--gray-100)"; e.currentTarget.style.boxShadow = "none"; }}
               >
                  <Calendar size={16} color="var(--gray-400)" /> {selectedDate} <ChevronDown size={16} color="var(--gray-300)" />
               </button>
               {showDatePicker && (
                 <div style={{
                   position: "absolute", top: "calc(100% + 10px)", right: 0, zIndex: 100,
                   background: "white", padding: 10, borderRadius: 16, border: "1px solid var(--gray-100)",
                   boxShadow: "var(--shadow-lg)",
                   animation: "slideUpFade 0.2s ease",
                 }}>
                   <input 
                     type="date" 
                     onChange={(e) => {
                       setSelectedDate(new Date(e.target.value).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' }));
                       setShowDatePicker(false);
                     }}
                     style={{
                       border: "none", outline: "none", fontSize: 13, fontWeight: 600, color: "var(--gray-800)",
                       padding: "8px 12px", borderRadius: 10, background: "var(--gray-50)", cursor: "pointer"
                     }}
                   />
                 </div>
               )}
             </div>
          </div>

          {/* Content View Switching */}
          {activeView === "board" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
               {Object.entries(tasks).map(([col, list], colIdx) => {
                  const colors = { "Harus Dikerjakan": "#94a3b8", "Sedang Berjalan": "#f59e0b", "Dalam Peninjauan": "#22c55e" };
                  const bgColors = { "Harus Dikerjakan": "#f8fafc", "Sedang Berjalan": "#fffbeb", "Dalam Peninjauan": "#f0fdf4" };
                  return (
                    <div key={col} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                       <div style={{ 
                         display: "flex", alignItems: "center", justifyContent: "space-between", 
                         padding: "8px 12px",
                         background: bgColors[col],
                         borderRadius: 12,
                         border: `1px solid ${colors[col]}20`,
                       }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                             <div style={{ width: 8, height: 8, borderRadius: 4, background: colors[col] }} />
                             <h4 style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-800)" }}>{col}</h4>
                             <span style={{ 
                                width: 22, height: 22, background: "white", borderRadius: 8,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 11, fontWeight: 800, color: "var(--gray-500)",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                             }}>{list.length}</span>
                          </div>
                          <button 
                            style={{ color: "var(--gray-300)", padding: 4, borderRadius: 6, transition: "all 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.background = "white"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >
                            <MoreVertical size={16} />
                          </button>
                       </div>
                       
                       <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                          {list.map((t, i) => <KanbanCard key={t.id} task={t} borderColor={colors[col]} index={colIdx * 3 + i} />)}
                          <button 
                            onClick={() => handleAddTask(col)}
                            style={{
                              width: "100%", padding: "14px", borderRadius: 16, border: "2px dashed var(--gray-100)",
                              color: "var(--gray-400)", fontWeight: 700, fontSize: 13, background: "transparent", 
                              transition: "all 0.25s",
                              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                              cursor: "pointer",
                            }}
                            onMouseEnter={e => { 
                              e.currentTarget.style.borderColor = "var(--green-300)"; 
                              e.currentTarget.style.color = "var(--green-600)";
                              e.currentTarget.style.background = "var(--green-50)";
                            }}
                            onMouseLeave={e => { 
                              e.currentTarget.style.borderColor = "var(--gray-100)"; 
                              e.currentTarget.style.color = "var(--gray-400)";
                              e.currentTarget.style.background = "transparent";
                            }}
                          ><Plus size={16} /> Tambah Tugas</button>
                       </div>
                    </div>
                  );
               })}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{
                padding: "16px 24px", background: "white", borderRadius: 18, border: "1px solid var(--gray-100)",
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 20,
                fontSize: 12, fontWeight: 800, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: "0.05em"
              }}>
                <span>Judul Tugas</span>
                <span>Waktu</span>
                <span>Batas Waktu</span>
                <span>Status</span>
              </div>
              {allTasksList.map((t, i) => (
                <Card key={t.id} style={{
                  padding: "16px 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 20,
                  alignItems: "center", borderRadius: 18, animation: `staggerUp 0.3s ease ${i * 40}ms both`, opacity: 0
                }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)" }}>{t.title}</span>
                  <span style={{ fontSize: 13, color: "var(--gray-500)", fontWeight: 600 }}>{t.time}</span>
                  <span style={{ fontSize: 13, color: "var(--gray-500)", fontWeight: 600 }}>{t.due}</span>
                  <div>
                     <span style={{ 
                       fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 10,
                       background: t.column === "Sedang Berjalan" ? "#fffbeb" : t.column === "Dalam Peninjauan" ? "#f0fdf4" : "var(--gray-50)",
                       color: t.column === "Sedang Berjalan" ? "#f59e0b" : t.column === "Dalam Peninjauan" ? "#22c55e" : "var(--gray-400)"
                     }}>{t.column}</span>
                  </div>
                </Card>
              ))}
              <button 
                onClick={() => handleAddTask("Harus Dikerjakan")}
                style={{
                  width: "100%", padding: "16px", borderRadius: 18, border: "2px dashed var(--gray-100)",
                  color: "var(--gray-400)", fontWeight: 700, fontSize: 14, background: "transparent", 
                  transition: "all 0.25s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  marginTop: 8, cursor: "pointer",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--green-200)"; e.currentTarget.style.background = "var(--gray-50)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--gray-100)"; e.currentTarget.style.background = "transparent"; }}
              ><Plus size={18} /> Tambah Tugas Baru</button>
            </div>
          )}
        </div>

        {/* ── RIGHT ANALYTICS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* Crop Progress */}
          <Card style={{ padding: 24, borderRadius: 24, animation: "staggerUp 0.5s ease 100ms both", opacity: 0 }}>
             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: "var(--gray-900)" }}>Kemajuan Tanaman</h4>
                <button style={{ 
                  width: 28, height: 28, background: "var(--gray-50)", borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-400)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--gray-100)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--gray-50)"}
                ><MoreVertical size={14} /></button>
             </div>
             
             <GaugeProgress value={81} />
             
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 4px", marginTop: 20 }}>
                {[
                   { c: "#16a34a", l: "Selesai", v: "65%" }, 
                   { c: "#4ade80", l: "Sedang Berjalan", v: "12%" },
                   { c: "#fbd34d", l: "Berisiko", v: "8%" },    
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

          {/* Irrigation Chart — now interactive */}
          <Card style={{ padding: 24, borderRadius: 24, animation: "staggerUp 0.5s ease 200ms both", opacity: 0 }}>
             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 800, color: "var(--gray-900)" }}>Waktu Irigasi</h4>
                  <p style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 2, fontWeight: 500 }}>Penggunaan air mingguan</p>
                </div>
                <button style={{ 
                  width: 28, height: 28, background: "var(--gray-50)", borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-400)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--gray-100)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--gray-50)"}
                ><MoreVertical size={14} /></button>
             </div>
             
             <AnimatedAreaChart 
               data={irrigationData} 
               height={140}
               color="var(--green-500)"
             />
          </Card>

          {/* AI Banner */}
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
            {/* Decorative circles */}
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
            <div style={{ position: "absolute", bottom: -30, right: 40, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
            
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Sparkles size={18} color="white" />
              <h4 style={{ color: "white", fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>Pembaruan Tugas Pintar</h4>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 500, lineHeight: 1.6, marginTop: 6, maxWidth: "80%" }}>
              AI melacak, menganalisis, dan memperbarui status tugas untuk meningkatkan efisiensi alur kerja.
            </p>
            <button style={{ 
              marginTop: 20, height: 40, padding: "0 22px", background: "white", borderRadius: 12,
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
