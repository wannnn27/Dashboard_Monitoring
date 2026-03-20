// pages/SurveillancePage.jsx
import { useState, useEffect } from "react";
import { Card, Badge, ProgressBar, AnimatedNumber } from "../components/ui";
import { CAMERAS } from "../lib/data";
import { 
  Video, 
  MapPin, 
  Maximize2, 
  Grid, 
  Square, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Clock, 
  Camera,
  Activity,
  History,
  ChevronRight,
  Monitor,
  Shield,
  Wifi
} from "lucide-react";

export default function SurveillancePage() {
  const [selected, setSelected] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(80);
  const [activeView, setActiveView] = useState(0);
  const [timePosition, setTimePosition] = useState(35);
  const cam = CAMERAS[selected];

  // Simulate time progression
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimePosition(prev => prev >= 85 ? 35 : prev + 0.3);
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="page-transition" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      
      {/* ── LEFT: Camera Selection ── */}
      <div style={{ width: 320, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
        <Card style={{ padding: 22, borderRadius: 22, animation: "staggerUp 0.5s ease both", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ 
              padding: 8, 
              background: "linear-gradient(135deg, var(--green-500), #34d399)", 
              borderRadius: 12, color: "white",
              boxShadow: "0 4px 12px rgba(34,197,94,0.2)",
            }}>
              <Video size={16} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)" }}>Cakupan Kamera</p>
              <p style={{ fontSize: 11, color: "var(--gray-400)", fontWeight: 500 }}>{CAMERAS.length} kamera aktif</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {CAMERAS.map((c, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                onMouseEnter={() => setIsHovered(i)}
                onMouseLeave={() => setIsHovered(null)}
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: 16,
                  border: "2px solid",
                  borderColor: selected === i ? "var(--green-400)" : isHovered === i ? "var(--gray-200)" : "var(--gray-100)",
                  background: selected === i ? "var(--green-50)" : "white",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  position: "relative",
                  boxShadow: selected === i ? "0 4px 16px rgba(34,197,94,0.1)" : "none",
                  transform: isHovered === i && selected !== i ? "translateX(4px)" : "translateX(0)",
                  animation: `staggerUp 0.4s ease ${i * 50}ms both`,
                  opacity: 0,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "var(--gray-900)" }}>{c.name}</p>
                  {selected === i && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div className="breathe" style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444" }} />
                      <span style={{ fontSize: 10, fontWeight: 800, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.05em" }}>Langsung</span>
                    </div>
                  )}
                </div>
                
                <div style={{ display: "flex", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--gray-400)", fontWeight: 500 }}>
                    <MapPin size={11} /> {c.region}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--gray-400)", fontWeight: 500 }}>
                    <Monitor size={11} /> {c.size}
                  </div>
                </div>

                {(selected === i || isHovered === i) && (
                  <ChevronRight size={14} style={{ 
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    color: selected === i ? "var(--green-600)" : "var(--gray-300)",
                    animation: "slideInRight 0.15s ease-out",
                  }} />
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <Card style={{ padding: 20, borderRadius: 18, animation: "staggerUp 0.5s ease 200ms both", opacity: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: "var(--gray-900)", marginBottom: 14 }}>Status Sistem</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: Shield, label: "Tingkat Keamanan", value: "Tinggi", color: "var(--green-600)" },
              { icon: Wifi, label: "Status Jaringan", value: "Stabil", color: "var(--green-500)" },
              { icon: Activity, label: "Beban Sistem", value: "42%", color: "#f59e0b" },
            ].map((item, i) => (
              <div key={item.label} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px",
                background: "var(--gray-50)",
                borderRadius: 12,
                animation: `staggerUp 0.3s ease ${250 + i * 50}ms both`,
                opacity: 0,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--gray-600)", fontWeight: 600 }}>
                  <item.icon size={14} color={item.color} />
                  {item.label}
                </div>
                <span style={{ fontSize: 12, fontWeight: 800, color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── RIGHT: Live Stream ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        <Card style={{ overflow: "hidden", borderRadius: 22, animation: "staggerUp 0.5s ease 50ms both", opacity: 0 }}>
          {/* Main Feed Container */}
          <div style={{
            height: 400,
            background: "linear-gradient(145deg, #064e3b 0%, #065f46 50%, #047857 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Animated scan line */}
            <div style={{
              position: "absolute",
              left: 0, right: 0,
              height: 2,
              background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)",
              animation: "scanLine 4s linear infinite",
              zIndex: 2,
            }} />
            <style>{`@keyframes scanLine { 0% { top: 0; } 100% { top: 100%; } }`}</style>

            {/* Corner Markers */}
            {[
              { top: 20, left: 20, borderTop: "2px solid rgba(34,197,94,0.5)", borderLeft: "2px solid rgba(34,197,94,0.5)" },
              { top: 20, right: 20, borderTop: "2px solid rgba(34,197,94,0.5)", borderRight: "2px solid rgba(34,197,94,0.5)" },
              { bottom: 20, left: 20, borderBottom: "2px solid rgba(34,197,94,0.5)", borderLeft: "2px solid rgba(34,197,94,0.5)" },
              { bottom: 20, right: 20, borderBottom: "2px solid rgba(34,197,94,0.5)", borderRight: "2px solid rgba(34,197,94,0.5)" },
            ].map((style, i) => (
              <div key={i} style={{ position: "absolute", width: 24, height: 24, ...style, borderRadius: 4 }} />
            ))}

            {/* Live Indicator Overlay */}
            <div style={{
              position: "absolute", top: 20, left: 20,
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
              padding: "6px 14px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              zIndex: 10
            }}>
              <div className="breathe" style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
              <span style={{ color: "white", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>LANGSUNG — {cam.code}</span>
            </div>

            <span style={{
              position: "absolute", top: 24, right: 24,
              color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 500,
              display: "flex", alignItems: "center", gap: 6, zIndex: 10,
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(6px)",
              padding: "4px 12px",
              borderRadius: 8,
            }}><Clock size={12} /> Gerakan Terakhir: 2 menit yang lalu</span>

            {/* Center Camera Icon */}
            <div style={{ textAlign: "center", zIndex: 2 }}>
              <div style={{
                width: 72, height: 72, borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
              }}>
                <Camera size={32} color="white" />
              </div>
              <h2 style={{ color: "white", fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em" }}>{cam.name}</h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 600, marginTop: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Tautan Aman Terjalin</p>
            </div>

            {/* Telemetry Overlay Card */}
            <div style={{
              position: "absolute", bottom: 20, right: 20,
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(12px)",
              borderRadius: 18,
              padding: "18px",
              width: 200,
              boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
              zIndex: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              animation: "staggerUp 0.4s ease 200ms both",
              opacity: 0,
            }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: "var(--gray-900)", marginBottom: 3 }}>{cam.name}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                 <div className="ring-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-500)" }} />
                 <p style={{ fontSize: 10, color: "var(--gray-500)", fontWeight: 700, letterSpacing: "0.05em" }}>AI OPTIMIZED</p>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                {[
                  { label: "Stabilitas", val: "98.4%", icon: Activity },
                  { label: "Status Tanaman", val: "Optimal", icon: MapPin },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "var(--gray-400)", display: "flex", alignItems: "center", gap: 5, fontWeight: 500 }}>
                       <item.icon size={12} /> {item.label}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--gray-900)", fontWeight: 800 }}>{item.val}</span>
                  </div>
                ))}
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                 <div style={{ flex: 1 }}><ProgressBar value={82} height={5} color="var(--green-500)" /></div>
                 <span style={{ fontSize: 10, fontWeight: 800, color: "var(--green-600)" }}>HD</span>
              </div>
            </div>
          </div>

          {/* Enhanced Control Bar */}
          <div style={{
            padding: "14px 24px",
            borderBottom: "1px solid var(--gray-50)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "var(--white)"
          }}>
            <div style={{ display: "flex", gap: 6 }}>
              {[
                { icon: Square, label: "Tunggal" },
                { icon: Grid, label: "Kisi" },
                { icon: Maximize2, label: "Penuh" }
              ].map((ctrl, idx) => (
                <button 
                  key={idx} 
                  title={ctrl.label} 
                  onClick={() => setActiveView(idx)}
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: activeView === idx ? "var(--green-50)" : "var(--gray-50)",
                    color: activeView === idx ? "var(--green-600)" : "var(--gray-400)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.25s",
                    border: activeView === idx ? "1px solid var(--green-200)" : "1px solid transparent",
                  }}
                  onMouseEnter={e => { if(activeView !== idx) { e.currentTarget.style.background = "var(--gray-100)"; e.currentTarget.style.color = "var(--gray-600)"; }}}
                  onMouseLeave={e => { if(activeView !== idx) { e.currentTarget.style.background = "var(--gray-50)"; e.currentTarget.style.color = "var(--gray-400)"; }}}
                ><ctrl.icon size={16} /></button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 6, background: "var(--gray-50)", padding: "4px 12px", borderRadius: 14, border: "1px solid var(--gray-100)" }}>
              {[
                { icon: SkipBack, label: "Kembali" },
                { icon: isPlaying ? Pause : Play, label: isPlaying ? "Jeda" : "Putar", active: true },
                { icon: SkipForward, label: "Maju" }
              ].map((ctrl, idx) => (
                <button 
                  key={idx}
                  onClick={() => { if(idx === 1) setIsPlaying(!isPlaying); }}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: ctrl.active ? "var(--green-500)" : "transparent",
                    color: ctrl.active ? "white" : "var(--gray-500)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.25s",
                    boxShadow: ctrl.active ? "0 4px 12px rgba(34,197,94,0.25)" : "none",
                  }}
                  onMouseEnter={e => { if(!ctrl.active) e.currentTarget.style.color = "var(--green-600)"; }}
                  onMouseLeave={e => { if(!ctrl.active) e.currentTarget.style.color = "var(--gray-500)"; }}
                ><ctrl.icon size={18} fill={ctrl.active ? "white" : "none"} /></button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Volume2 size={16} color="var(--gray-400)" />
              <div 
                style={{ width: 80, height: 5, borderRadius: 99, background: "var(--gray-100)", position: "relative", cursor: "pointer" }}
                onClick={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                  setVolume(Math.max(0, Math.min(100, pct)));
                }}
              >
                 <div style={{ width: `${volume}%`, height: "100%", background: "var(--green-500)", borderRadius: 99, transition: "width 0.1s ease" }} />
                 <div style={{
                   position: "absolute",
                   left: `${volume}%`, top: "50%",
                   transform: "translate(-50%, -50%)",
                   width: 12, height: 12,
                   borderRadius: "50%",
                   background: "var(--green-500)",
                   border: "2px solid white",
                   boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                   transition: "left 0.1s ease",
                 }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-600)", minWidth: 28 }}>{volume}%</span>
            </div>
          </div>

          {/* Navigation Timeline */}
          <div style={{ padding: "14px 20px" }}>
            <div style={{
              height: 44,
              background: "var(--gray-50)",
              borderRadius: 14,
              position: "relative",
              overflow: "hidden",
              display: "flex", alignItems: "center",
              border: "1px solid var(--gray-100)",
              cursor: "pointer",
            }}
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setTimePosition(Math.max(5, Math.min(90, pct)));
            }}
            >
              {Array.from({ length: 9 }, (_, i) => (
                <div key={i} style={{
                  flex: 1, textAlign: "center",
                  fontSize: 10, color: "var(--gray-400)",
                  fontWeight: 600,
                  letterSpacing: "0.04em"
                }}>
                  {(7 + i).toString().padStart(2, "0")}:00
                </div>
              ))}
              {/* Animated Progress indicator */}
              <div style={{
                position: "absolute",
                left: `${timePosition}%`, top: 6, bottom: 6,
                width: 60,
                transform: "translateX(-50%)",
                background: "rgba(34,197,94,0.12)",
                border: "2px solid var(--green-500)",
                borderRadius: 10,
                boxShadow: "0 0 12px rgba(34,197,94,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--green-700)", fontSize: 10, fontWeight: 800,
                letterSpacing: "0.05em",
                transition: "left 0.1s linear",
              }}>
                 REC
              </div>
            </div>
          </div>
        </Card>

        {/* Dynamic Status Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { label: "Area Cakupan",    value: cam.size, icon: Monitor    },
            { label: "Aktivitas Terakhir",    value: "2 menit lalu", icon: History },
            { label: "Status Rekaman", value: "Aktif / HD", icon: Activity },
          ].map(({ label, value, icon: Icon }, i) => (
            <Card 
              key={label} 
              style={{ 
                padding: "18px 20px", display: "flex", alignItems: "center", gap: 14,
                borderRadius: 18,
                transition: "all 0.25s ease",
                cursor: "default",
                animation: `staggerUp 0.4s ease ${100 + i * 60}ms both`,
                opacity: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
            >
               <div style={{ 
                 width: 42, height: 42, borderRadius: 14, 
                 background: "var(--gray-50)", 
                 display: "flex", alignItems: "center", justifyContent: "center", 
                 color: "var(--gray-500)",
                 transition: "all 0.3s ease",
               }}>
                 <Icon size={18} />
               </div>
               <div>
                 <p style={{ fontSize: 10, color: "var(--gray-400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{label}</p>
                 <p style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)" }}>{value}</p>
               </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
