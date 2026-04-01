// pages/OverviewPage.jsx
import { useState, useEffect } from "react";
import { Card, Button, AnimatedNumber } from "../components/ui";
import { ALERTS, SENSORS, SCHEDULE_ITEMS } from "../lib/data";
import { 
  TrendingUp, 
  MapPin, 
  Sun, 
  ExternalLink,
  LayoutGrid,
  ArrowUpRight,
  Droplets,
  CalendarDays
} from "lucide-react";
import * as LucideIcons from "lucide-react";

export default function OverviewPage() {
  const [activeDay, setActiveDay] = useState(() => {
    const days = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
    return days[new Date().getDay()];
  });
  const [hoveredAlert, setHoveredAlert] = useState(null);
  const [hoveredSensor, setHoveredSensor] = useState(null);
  const [hoveredSchedule, setHoveredSchedule] = useState(null);
  const [mounted, setMounted] = useState(false);
  const HERO_IMAGE = "/greenhouse.png";

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const timeBlocks = [
    { label: "Penyiraman", start: 35, width: 20, color: "var(--green-500)", icon: LucideIcons.Droplets },
    { label: "Pemupukan", start: 60, width: 15, color: "#f59e0b", icon: LucideIcons.Leaf },
  ];

  return (
    <div className="page-transition" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      
      {/* ── TOP HDR ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--gray-900)", letterSpacing: "-0.03em" }}>Ikhtisar</h2>
          <p style={{ fontSize: 13, color: "var(--gray-400)", fontWeight: 500, marginTop: 4 }}>
            Pantau kondisi rumah kaca, peringatan, dan aktivitas harian.
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
        
        {/* ── LEFT SECTION ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          
          {/* Hero Card : New Split Concept */}
          <Card style={{ 
            display: "flex",
            position: "relative", 
            overflow: "hidden", 
            background: "white",
            minHeight: 320,
            borderRadius: 24,
            border: "1px solid var(--gray-100)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
            animation: mounted ? "slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) both" : "none",
          }}>
            {/* Left/Content Side */}
            <div style={{ flex: 1, padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              
              {/* Top: Date & Location */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "var(--gray-50)", borderRadius: 99, color: "var(--gray-600)", fontSize: 13, fontWeight: 700 }}>
                  <CalendarDays size={16} color="var(--gray-400)" />
                  {(() => {
                    const idDays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
                    const idMonths = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
                    const d = new Date();
                    return `${idDays[d.getDay()]}, ${d.getDate()} ${idMonths[d.getMonth()]}`;
                  })()}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--gray-500)", fontSize: 13, fontWeight: 600 }}>
                  <MapPin size={14} color="var(--green-500)" /> Bogor, Indonesia
                </div>
              </div>

              {/* Middle: Big Temp & Weather */}
              <div style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: 40 }}>
                <div>
                  <h1 style={{ fontSize: 72, fontWeight: 800, color: "var(--gray-900)", lineHeight: 1, letterSpacing: "-0.04em", display: "flex", alignItems: "start" }}>
                    <AnimatedNumber value={22} duration={800} /><span style={{ fontSize: 32, marginTop: 8, color: "var(--gray-400)" }}>°C</span>
                  </h1>
                </div>
                <div style={{ width: 1, height: 60, background: "var(--gray-100)" }} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 12,
                      background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(245, 158, 11, 0.2)"
                    }}>
                      <Sun size={20} color="#d97706" fill="#f59e0b" />
                    </div>
                    <div>
                      <p style={{ fontSize: 18, fontWeight: 800, color: "var(--gray-800)", lineHeight: 1 }}>Cerah</p>
                      <p style={{ fontSize: 12, color: "var(--gray-400)", fontWeight: 600, marginTop: 4 }}>Terasa seperti 24°C</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: Mini Env Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {[
                  { icon: Droplets, label: "Kelembapan", value: "65%", trend: "Opt" },
                  { icon: LucideIcons.Wind, label: "Angin", value: "12 km/h", trend: "-1%" },
                  { icon: LucideIcons.Activity, label: "Kualitas", value: "98%", trend: "+2%" },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    padding: 16, borderRadius: 16, background: "var(--gray-50)",
                    border: "1px solid var(--gray-100)", transition: "all 0.2s ease",
                    cursor: "default"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "var(--green-200)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(34,197,94,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--gray-50)"; e.currentTarget.style.borderColor = "var(--gray-100)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <item.icon size={16} color="var(--green-600)" />
                      <span style={{ fontSize: 10, fontWeight: 800, color: "var(--green-600)", background: "var(--green-100)", padding: "2px 6px", borderRadius: 6 }}>{item.trend}</span>
                    </div>
                    <p style={{ fontSize: 11, color: "var(--gray-400)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.label}</p>
                    <p style={{ fontSize: 18, fontWeight: 800, color: "var(--gray-900)", marginTop: 2 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right/Visual Side */}
            <div style={{ 
              flex: "0 0 40%", 
              minWidth: 300,
              background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", 
              position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden",
            }}>
              {/* Decorative Background Circles */}
              <div style={{ position: "absolute", width: 400, height: 400, background: "rgba(255,255,255,0.4)", borderRadius: "50%", filter: "blur(60px)", top: "10%", left: "10%" }} />
              
              <img 
                src={HERO_IMAGE} 
                alt="Peta Rumah Kaca" 
                style={{ 
                  width: "110%", 
                  objectFit: "contain",
                  transform: "translateY(10px)",
                  filter: "drop-shadow(0 20px 40px rgba(22, 163, 74, 0.15))",
                  zIndex: 2,
                }} 
              />

              {/* Interactive Nodes instead of glowing box */}
              {[
                { top: "35%", left: "30%", label: "Sektor Utama", status: "Optimal" },
                { top: "60%", left: "65%", label: "Sektor Hidro", status: "Aktif" },
              ].map((node, i) => (
                <div key={i} className="node-container" style={{ position: "absolute", top: node.top, left: node.left, zIndex: 10, cursor: "pointer" }}>
                  <div className="ring-pulse" style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--green-500)", border: "3px solid white", boxShadow: "0 0 0 4px rgba(34,197,94,0.2)" }} />
                  <div className="node-tooltip" style={{
                    position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%) translateY(0px)",
                    background: "white", padding: "8px 12px", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    opacity: 0, pointerEvents: "none", transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)", whiteSpace: "nowrap", border: "1px solid var(--gray-100)",
                  }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "var(--gray-900)" }}>{node.label}</p>
                    <p style={{ fontSize: 10, fontWeight: 600, color: "var(--green-600)", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-500)" }} /> {node.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <style>{`
            .node-container:hover .node-tooltip { opacity: 1 !important; transform: translateX(-50%) translateY(-10px) !important; pointer-events: auto !important; }
          `}</style>

          {/* Bottom Metrics Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {SENSORS.map((s, i) => {
              const Icon = LucideIcons[s.icon] || LucideIcons.Activity;
              const isHovered = hoveredSensor === i;
              return (
                <Card 
                  key={i} 
                  style={{ 
                    padding: 24, 
                    cursor: "pointer", 
                    display: "flex", flexDirection: "column", gap: 16,
                    borderRadius: 22,
                    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                    borderColor: isHovered ? "var(--green-200)" : "var(--gray-100)",
                    boxShadow: isHovered ? "0 12px 32px rgba(34,197,94,0.12)" : "var(--shadow-sm)",
                    animation: `staggerUp 0.5s ease ${200 + i * 100}ms both`,
                    opacity: 0,
                  }}
                  onClick={() => {}}
                  onMouseEnter={() => setHoveredSensor(i)}
                  onMouseLeave={() => setHoveredSensor(null)}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ 
                        width: 44, height: 44, 
                        background: isHovered ? "var(--green-50)" : "var(--gray-50)", 
                        borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", 
                        color: isHovered ? "var(--green-600)" : "var(--gray-700)",
                        transition: "all 0.3s ease",
                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                      }}>
                        <Icon size={22} />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)" }}>{s.label}</span>
                    </div>
                    {isHovered && (
                      <ArrowUpRight size={16} color="var(--green-500)" style={{ animation: "slideUpFade 0.2s ease" }} />
                    )}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 44, fontWeight: 800, color: "var(--gray-900)", lineHeight: 1 }}>
                        <AnimatedNumber value={parseInt(s.value)} duration={600 + i * 200} />
                      </span>
                      <span style={{ fontSize: 18, color: "var(--gray-400)", fontWeight: 700 }}>{s.unit}</span>
                    </div>
                    {s.desc && <p style={{ fontSize: 12, color: "var(--gray-400)", marginTop: 10, lineHeight: 1.5, fontWeight: 500 }}>{s.desc}</p>}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT SECTION ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* Critical Alerts Card */}
          <Card style={{ 
            background: "linear-gradient(145deg, var(--green-500), var(--green-600))", 
            padding: 28, 
            borderRadius: 28, 
            boxShadow: "0 16px 48px rgba(34,197,94,0.28)",
            color: "white",
            border: "none",
            animation: "staggerUp 0.5s ease 100ms both",
            opacity: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>Peringatan Kritis</h3>
              <div style={{
                background: "rgba(255,255,255,0.15)",
                padding: "4px 10px",
                borderRadius: 99,
                fontSize: 11,
                fontWeight: 700,
              }}>{ALERTS.filter(a => !a.ok).length} Masalah</div>
            </div>
            <p style={{ fontSize: 12, opacity: 0.7, fontWeight: 500, marginBottom: 28 }}>Pemantauan kesehatan rumah kaca waktu nyata</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {ALERTS.map((a, i) => (
                <div 
                  key={i} 
                  onMouseEnter={() => setHoveredAlert(i)}
                  onMouseLeave={() => setHoveredAlert(null)}
                  style={{ 
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "12px 14px",
                    borderRadius: 16,
                    background: hoveredAlert === i ? "rgba(255,255,255,0.12)" : "transparent",
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                    animation: `staggerUp 0.4s ease ${200 + i * 80}ms both`,
                    opacity: 0,
                  }}
                >
                  <div style={{ 
                    width: 48, height: 48, background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)", borderRadius: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                    transform: hoveredAlert === i ? "scale(1.08)" : "scale(1)",
                  }}>
                    {a.title.includes("Plant") ? <LucideIcons.Sprout size={22} /> : a.title.includes("Soil") ? <LucideIcons.Droplets size={22} /> : <LucideIcons.Pipette size={22} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 15, fontWeight: 800 }}>{a.title}</p>
                    <p style={{ fontSize: 11, opacity: 0.75, marginTop: 3, lineHeight: 1.4, fontWeight: 500 }}>{a.desc}</p>
                  </div>
                  <div style={{ 
                    width: 30, height: 30, borderRadius: 10, 
                    background: a.ok ? "rgba(255,255,255,0.9)" : "#ef4444",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: a.ok ? "var(--green-600)" : "white",
                    boxShadow: a.ok ? "none" : "0 4px 12px rgba(239,68,68,0.4)",
                    transition: "all 0.3s ease",
                    transform: hoveredAlert === i ? "scale(1.1)" : "scale(1)",
                  }}>
                    {a.ok ? <LucideIcons.Check size={16} strokeWidth={3} /> : <LucideIcons.X size={16} strokeWidth={3} />}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity Overview Card */}
          <Card style={{ padding: 28, borderRadius: 28, flex: 1, boxShadow: "var(--shadow-sm)", animation: "staggerUp 0.5s ease 200ms both", opacity: 0, }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--gray-900)" }}>Ikhtisar Aktivitas</h3>
              <LayoutGrid size={20} color="var(--gray-300)" />
            </div>
            <p style={{ fontSize: 12, color: "var(--gray-400)", fontWeight: 500, marginBottom: 24 }}>Jadwal aktivitas harian rumah kaca</p>

            {/* Days Picker */}
            <div style={{ display: "flex", width: "100%", marginBottom: 32, background: "var(--gray-50)", padding: 4, borderRadius: 14, border: "1px solid var(--gray-100)" }}>
              {["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"].map(d => (
                <button
                  key={d}
                  onClick={() => setActiveDay(d)}
                  style={{
                    flex: 1, padding: "10px 0", borderRadius: 10, fontSize: 10, fontWeight: 800,
                    background: activeDay === d ? "var(--green-500)" : "transparent",
                    color: activeDay === d ? "white" : "var(--gray-400)",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: activeDay === d ? "0 4px 12px rgba(34,197,94,0.25)" : "none",
                    transform: activeDay === d ? "scale(1.02)" : "scale(1)",
                    border: "none", cursor: "pointer", letterSpacing: "0.02em"
                  }}
                >{d}</button>
              ))}
            </div>

            {/* Interactive Timeline View */}
            <div style={{ 
              height: 200, background: "var(--gray-50)", borderRadius: 20, marginBottom: 32,
              border: "1px solid var(--gray-100)", position: "relative", overflow: "hidden",
            }}>
              {/* Grid lines */}
              {[25, 50, 75].map(pos => (
                <div key={pos} style={{ position: "absolute", left: `${pos}%`, top: 0, bottom: 32, width: 0, borderLeft: "1px dashed var(--gray-200)" }} />
              ))}
              <div style={{ position: "absolute", left: 0, top: "50%", right: 0, height: 1, background: "var(--gray-200)", opacity: 0.5 }} />

              {/* Time blocks */}
              {timeBlocks.map((block, i) => (
                <div 
                  key={i}
                  style={{
                    position: "absolute", left: `${block.start}%`, top: i === 0 ? "18%" : "54%",
                    width: "max-content", minWidth: 140, height: 54, padding: "0 16px",
                    background: "white", borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 12,
                    zIndex: 1, border: "1px solid var(--gray-100)", cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    animation: `staggerUp 0.4s ease ${300 + i * 100}ms both`, opacity: 0
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "scale(1.04) translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(34,197,94,0.12)";
                    e.currentTarget.style.borderColor = "var(--green-200)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor = "var(--gray-100)";
                  }}
                >
                  <div style={{ 
                    width: 32, height: 32, background: `${block.color}15`, borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center", color: block.color, flexShrink: 0
                  }}><block.icon size={16} /></div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 800, color: "var(--gray-900)", letterSpacing: "0.02em" }}>{block.label === "Watering" ? "Penyiraman" : block.label === "Fertilize" ? "Pemupukan" : block.label}</p>
                    <p style={{ fontSize: 10, color: "var(--gray-400)", fontWeight: 600, marginTop: 2 }}>Terjadwal</p>
                  </div>
                </div>
              ))}

              {/* Time labels */}
              <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, display: "flex", justifyContent: "space-between", padding: "0 20px", fontSize: 10, color: "var(--gray-400)", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                 <span>08:00</span><span>09:00</span><span>10:00</span><span>11:00</span>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {SCHEDULE_ITEMS.map((s, i) => (
                <div 
                  key={i} 
                  onMouseEnter={() => setHoveredSchedule(i)}
                  onMouseLeave={() => setHoveredSchedule(null)}
                  style={{ 
                    padding: "16px 20px", background: hoveredSchedule === i ? "white" : "var(--gray-50)", 
                    borderRadius: 18, display: "flex", alignItems: "center", gap: 16,
                    border: hoveredSchedule === i ? "1px solid var(--green-200)" : "1px solid var(--gray-100)",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)", cursor: "pointer",
                    transform: hoveredSchedule === i ? "translateX(4px)" : "translateX(0)",
                    boxShadow: hoveredSchedule === i ? "0 8px 24px rgba(34,197,94,0.08)" : "none"
                  }}
                  onClick={() => alert(`Membuka detail jadwal untuk: ${s.label}`)}
                >
                  <div style={{ 
                    width: 12, height: 12, borderRadius: "50%", background: "var(--green-500)", 
                    border: "3px solid white", boxShadow: "0 0 0 3px var(--green-100)",
                    transition: "all 0.3s ease", transform: hoveredSchedule === i ? "scale(1.2)" : "scale(1)"
                  }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)" }}>{s.label}</p>
                    <p style={{ fontSize: 12, color: "var(--gray-400)", fontWeight: 600, marginTop: 4 }}>{s.time}</p>
                  </div>
                  <Button 
                    variant="outline" size="sm" 
                    onClick={(e) => { e.stopPropagation(); alert(`Tugas berhasil dijadwalkan ke kalender!`); }}
                    style={{ 
                      padding: "8px 18px", background: "white", borderRadius: 12, 
                      border: "1.5px solid var(--gray-200)", fontSize: 12, fontWeight: 800, color: "var(--gray-800)",
                      cursor: "pointer", pointerEvents: "auto"
                    }}
                  >Jadwalkan</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
