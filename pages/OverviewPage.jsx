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
  const [activeDay, setActiveDay] = useState("THU");
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
    { label: "Pemupukan", start: 60, width: 15, color: "#f59e0b", icon: LucideIcons.Sparkles },
  ];

  return (
    <div className="page-transition" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      
      {/* ── TOP HDR ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28 }}>
        
        {/* ── LEFT SECTION ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          
          {/* Hero Card */}
          <Card style={{ 
            padding: 32, 
            position: "relative", 
            overflow: "hidden", 
            minHeight: 480,
            background: "linear-gradient(145deg, white 0%, #f7fdf9 50%, #f0fdf4 100%)",
            borderRadius: 28,
            border: "1px solid var(--green-100)",
          }}>
            {/* Subtle grid pattern */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `radial-gradient(circle, var(--gray-200) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
              opacity: 0.3,
              pointerEvents: "none",
            }} />

            {/* Weather Top Row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 10 }}>
              <div style={{ animation: mounted ? "slideUpFade 0.5s ease both" : "none" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-400)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <CalendarDays size={14} /> Sen, 22 Jul
                </p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
                  <h1 style={{ fontSize: 64, fontWeight: 800, color: "var(--gray-900)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                    <AnimatedNumber value={22} duration={800} />°C
                  </h1>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 10,
                        background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Sun size={18} color="#f59e0b" fill="#f59e0b" />
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 800, color: "var(--gray-800)" }}>Cerah</span>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 4,
                        background: "var(--green-50)",
                        padding: "3px 8px",
                        borderRadius: 99,
                      }}>
                        <TrendingUp size={12} color="var(--green-600)" />
                        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--green-600)" }}>+2°</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "var(--gray-400)", fontWeight: 600 }}>T 26°C · R 18°C</p>
                  </div>
                </div>
              </div>
              <div style={{ 
                display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
                background: "white", borderRadius: 14, 
                color: "var(--gray-700)", fontSize: 13, fontWeight: 700,
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                border: "1px solid var(--gray-100)",
                animation: mounted ? "slideUpFade 0.5s ease 0.1s both" : "none",
              }}>
                <MapPin size={14} color="var(--green-500)" /> Bogor, Indonesia
              </div>
            </div>

            {/* Isometric Hero Image Overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
              pointerEvents: "none"
            }}>
              <img 
                src={HERO_IMAGE} 
                alt="Peta Rumah Kaca" 
                className="float-animation"
                style={{ 
                  maxWidth: "100%", 
                  maxHeight: "100%", 
                  objectFit: "contain",
                  transform: "scale(1.08) translateY(15px)",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.08))",
                }} 
              />
            </div>

            {/* Interactive Bounding Box */}
            <div style={{
              position: "absolute",
              left: "40%",
              top: "55%",
              width: 200,
              height: 130,
              border: "2px solid rgba(34, 197, 94, 0.35)",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(4px)",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
              transform: "perspective(1200px) rotateX(45deg) rotateZ(-15deg)",
              boxShadow: "0 0 30px rgba(34, 197, 94, 0.12)",
              transition: "all 0.5s ease",
            }}>
              <div style={{ transform: "rotateZ(15deg) rotateX(-45deg)", textAlign: "center" }}>
                <p style={{ color: "var(--green-700)", fontSize: 11, fontWeight: 900, letterSpacing: "0.05em" }}>BAGIAN 01</p>
                <div className="ring-pulse" style={{ 
                  width: 10, height: 10, borderRadius: "50%", 
                  background: "var(--green-500)", margin: "8px auto",
                }} />
              </div>
            </div>

            {/* Humidity & Pressure mini badges */}
            <div style={{
              position: "absolute", bottom: 28, left: 32, zIndex: 10,
              display: "flex", gap: 10,
              animation: mounted ? "slideUpFade 0.5s ease 0.3s both" : "none",
            }}>
              {[
                { icon: Droplets, label: "Kelembapan", value: "65%" },
                { icon: LucideIcons.Wind, label: "Angin", value: "12 km/jam" },
              ].map((item) => (
                <div key={item.label} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(8px)",
                  padding: "8px 14px",
                  borderRadius: 12,
                  border: "1px solid var(--gray-100)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                  <item.icon size={14} color="var(--green-500)" />
                  <div>
                    <p style={{ fontSize: 9, color: "var(--gray-400)", fontWeight: 600 }}>{item.label}</p>
                    <p style={{ fontSize: 12, color: "var(--gray-800)", fontWeight: 800 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

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
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28, background: "var(--gray-50)", padding: 5, borderRadius: 14, border: "1px solid var(--gray-100)" }}>
              {["SEN", "SEL", "RAB", "KAM", "JUM", "SAB"].map(d => (
                <button
                  key={d}
                  onClick={() => setActiveDay(d)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    fontSize: 11,
                    fontWeight: 800,
                    background: activeDay === d ? "var(--green-500)" : "transparent",
                    color: activeDay === d ? "white" : "var(--gray-400)",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: activeDay === d ? "0 4px 14px rgba(34,197,94,0.25)" : "none",
                    transform: activeDay === d ? "scale(1.05)" : "scale(1)",
                    letterSpacing: "0.03em",
                  }}
                >{d}</button>
              ))}
            </div>

            {/* Interactive Timeline View */}
            <div style={{ 
              height: 180, 
              background: "var(--gray-50)", 
              borderRadius: 18, 
              marginBottom: 28,
              border: "1px solid var(--gray-100)",
              position: "relative",
              overflow: "hidden",
              cursor: "crosshair",
            }}>
              {/* Grid lines */}
              {[25, 50, 75].map(pos => (
                <div key={pos} style={{ position: "absolute", left: `${pos}%`, top: 0, bottom: 24, width: 1, background: "var(--gray-100)" }} />
              ))}
              <div style={{ position: "absolute", left: 0, top: "50%", right: 0, height: 1, background: "var(--gray-100)" }} />

              {/* Time blocks */}
              {timeBlocks.map((block, i) => (
                <div 
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${block.start}%`, 
                    top: i === 0 ? "15%" : "55%",
                    width: `${block.width}%`, 
                    height: 60,
                    background: "white", borderRadius: 14, 
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 10, zIndex: 1, border: "1px solid var(--gray-100)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    animation: `staggerUp 0.4s ease ${300 + i * 100}ms both`,
                    opacity: 0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                  }}
                >
                  <div style={{ 
                    width: 32, height: 32, background: `${block.color}15`, 
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    color: block.color,
                  }}>
                    <block.icon size={16} />
                  </div>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 800, color: "var(--gray-500)", letterSpacing: "0.03em" }}>{block.label === "Watering" ? "Penyiraman" : block.label === "Fertilize" ? "Pemupukan" : block.label}</p>
                    <p style={{ fontSize: 9, color: "var(--gray-400)", fontWeight: 600 }}>Dijadwalkan</p>
                  </div>
                </div>
              ))}

              {/* Time labels */}
              <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, display: "flex", justifyContent: "space-between", padding: "0 16px", fontSize: 10, color: "var(--gray-300)", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
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
                    padding: "16px 18px", 
                    background: hoveredSchedule === i ? "white" : "var(--gray-50)", 
                    borderRadius: 18,
                    display: "flex", alignItems: "center", gap: 16,
                    border: hoveredSchedule === i ? "1px solid var(--green-200)" : "1px solid var(--gray-100)",
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                    transform: hoveredSchedule === i ? "translateX(4px)" : "translateX(0)",
                    boxShadow: hoveredSchedule === i ? "0 4px 16px rgba(34,197,94,0.08)" : "none",
                  }}
                >
                  <div style={{ 
                    width: 10, height: 10, borderRadius: "50%", 
                    background: "var(--green-500)", 
                    border: "3px solid white", 
                    boxShadow: "0 0 0 4px var(--green-100)",
                    transition: "all 0.3s ease",
                  }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)" }}>{s.label}</p>
                    <p style={{ fontSize: 11, color: "var(--gray-400)", fontWeight: 600, marginTop: 2 }}>{s.time}</p>
                  </div>
                  <Button variant="outline" size="sm" style={{ 
                    padding: "8px 16px", background: "white", borderRadius: 12, 
                    border: "1.5px solid var(--gray-200)", fontSize: 12, fontWeight: 800, color: "var(--gray-800)" 
                  }}>Jadwalkan</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
