// pages/DevicesPage.jsx
import { useState } from "react";
import { Card, Badge, Button, AnimatedNumber, ProgressBar } from "../components/ui";
import { DEVICES } from "../lib/data";
import { 
  Wifi, 
  Battery, 
  Cpu, 
  AlertTriangle, 
  Signal, 
  Activity, 
  ShieldCheck, 
  Zap,
  Plus,
  ArrowRight,
  Settings,
  Database,
  Timer,
  ChevronRight
} from "lucide-react";

const DEVICE_DETAIL = {
  "Sensor Tanah 01":            { connectivity: "Kelas A",   power: "Cadangan Baterai",  radio: "Baik @SSI -85 dBm / SNR 6.5 dB", tipe: "Libelium Plug & Sensor" },
  "Sensor Cuaca 01":            { connectivity: "Kelas B",   power: "Tenaga Surya",      radio: "Sangat Baik @SSI -72 dBm / SNR 9.1 dB", tipe: "Davis Vantage Vue" },
  "Kontroler Irigasi 01":       { connectivity: "Kelas A",   power: "Daya Utama",      radio: "Baik @SSI -80 dBm / SNR 7.2 dB", tipe: "Hunter Node-200" },
  "Kamera 01":                 { connectivity: "Kelas C",   power: "Cadangan Aktif",  radio: "Lemah @SSI -95 dBm / SNR 3.1 dB", tipe: "Reolink RLC-810A" },
};

export default function DevicesPage() {
  const [selected, setSelected] = useState(0);
  const [hoveredDevice, setHoveredDevice] = useState(null);
  const [hoveredSpec, setHoveredSpec] = useState(null);
  const dev = DEVICES[selected];
  const detail = DEVICE_DETAIL[dev.name] || DEVICE_DETAIL["Sensor Tanah 01"];

  return (
    <div className="page-transition" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      
      {/* ── LEFT COLUMN ── */}
      <div style={{ width: 340, flexShrink: 0, display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Overview Banner */}
        <div style={{
          background: "linear-gradient(145deg, var(--green-600) 0%, var(--green-500) 50%, #34d399 100%)",
          borderRadius: 24,
          padding: "24px",
          boxShadow: "0 16px 40px rgba(34,197,94,0.2)",
          position: "relative",
          overflow: "hidden",
          animation: "staggerUp 0.5s ease both",
          opacity: 0,
        }}>
          {/* Decorative elements */}
          <div style={{ position: "absolute", top: -30, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", bottom: -20, left: 20, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          
          <Cpu style={{ position: "absolute", right: -8, top: -8, opacity: 0.1 }} size={90} color="white" />
          <p style={{ color: "white", fontWeight: 800, fontSize: 16, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
            <Zap size={18} fill="white" /> Pertanian Pintar
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginBottom: 24, fontWeight: 500 }}>Manajemen pertanian cerdas</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ 
              width: 52, height: 52, borderRadius: 16, background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "white"
            }}>
              <span style={{ fontSize: 22, fontWeight: 800 }}>
                <AnimatedNumber value={8} duration={600} />
              </span>
            </div>
            <div>
              <p style={{ color: "white", fontWeight: 800, fontSize: 14 }}>Perangkat Terhubung</p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: 500 }}>Semua sistem beroperasi secara real-time</p>
            </div>
          </div>
        </div>

        {/* Key Indicators */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { val: "1",   label: "Peringatan", icon: AlertTriangle, color: "#ef4444", bg: "#fef2f2" },
            { val: "80%", label: "Sinyal", icon: Signal, color: "var(--green-600)", bg: "var(--green-50)" },
            { val: "14h", label: "Aktif", icon: Timer, color: "var(--gray-700)", bg: "var(--gray-50)" },
          ].map((s, i) => (
            <Card 
              key={s.label} 
              style={{ 
                padding: "16px 12px", textAlign: "center", 
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                borderRadius: 18,
                animation: `staggerUp 0.4s ease ${50 + i * 60}ms both`,
                opacity: 0,
                transition: "all 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
            >
              <div style={{ color: s.color, background: s.bg, padding: 8, borderRadius: 10, display: "flex" }}>
                <s.icon size={16} />
              </div>
              <div>
                <p style={{ fontSize: 18, fontWeight: 800, color: "var(--gray-900)", lineHeight: 1 }}>{s.val}</p>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", marginTop: 3 }}>{s.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Device List */}
        <Card style={{ padding: 24, borderRadius: 22, animation: "staggerUp 0.5s ease 100ms both", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <p style={{ fontSize: 15, fontWeight: 800, color: "var(--gray-900)" }}>Daftar Perangkat</p>
            <Button variant="primary" size="sm" style={{ padding: "6px 14px", borderRadius: 10 }}><Plus size={14} /> Tambah</Button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {DEVICES.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                onMouseEnter={() => setHoveredDevice(i)}
                onMouseLeave={() => setHoveredDevice(null)}
                style={{
                  textAlign: "left",
                  padding: "16px",
                  borderRadius: 18,
                  border: "2px solid",
                  borderColor: selected === i ? "var(--green-400)" : hoveredDevice === i ? "var(--gray-200)" : "var(--gray-100)",
                  background: selected === i ? "var(--green-50)" : "white",
                  boxShadow: selected === i ? "0 4px 16px rgba(34,197,94,0.1)" : "none",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  animation: `staggerUp 0.4s ease ${150 + i * 60}ms both`,
                  opacity: 0,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "var(--gray-900)" }}>{d.name}</p>
                  <Badge
                    label={d.signal === "Lemah" ? "Peringatan" : "Daring"}
                    variant={d.signal === "Lemah" ? "red" : "green"}
                  />
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--gray-400)", fontWeight: 600 }}>
                     <Battery size={12} /> {d.battery.includes("Tenaga Surya") ? "Surya" : "Aktif"}
                   </div>
                   <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--gray-400)", fontWeight: 600 }}>
                     <Wifi size={12} color={d.signal === "Lemah" ? "#ef4444" : "var(--green-600)"} /> {d.signal}
                   </div>
                </div>
                {(selected === i || hoveredDevice === i) && (
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
      </div>

      {/* ── RIGHT: Detailed Specs ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
        <Card style={{ overflow: "hidden", borderRadius: 24, animation: "staggerUp 0.5s ease 50ms both", opacity: 0 }}>
          <div style={{
            height: 220,
            background: "linear-gradient(145deg, #064e3b 0%, #065f46 50%, #047857 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}>
            <div style={{ 
              position: "absolute", width: "100%", height: "100%", 
              backgroundImage: "radial-gradient(circle at center, rgba(34,197,94,0.15) 0%, transparent 70%)" 
            }} />
            
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <div style={{ 
                width: 68, height: 68, borderRadius: "20px", background: "rgba(255,255,255,0.1)", 
                backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", marginBottom: 16, margin: "0 auto 16px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}>
                <Cpu size={30} />
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Node Perangkat</p>
              <h2 style={{ color: "white", fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>{dev.name}</h2>
              <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 8 }}>
                <span style={{ background: "rgba(34,197,94,0.2)", border: "1px solid var(--green-400)", color: "white", padding: "4px 14px", borderRadius: 99, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  <div className="ring-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                  TERVERIFIKASI
                </span>
                <span style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)", padding: "4px 14px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>LOCAL-NODE-04</span>
              </div>
            </div>
          </div>

          <div style={{ padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
               <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--gray-900)", display: "flex", alignItems: "center", gap: 10, letterSpacing: "-0.01em" }}>
                 <Settings size={18} color="var(--gray-400)" /> Spesifikasi Perangkat
               </h3>
               <div style={{ display: "flex", gap: 8 }}>
                 <Button variant="outline" size="sm" style={{ borderRadius: 10 }}>Log Firmware</Button>
                 <Button variant="dark" size="sm" style={{ borderRadius: 10 }}>Konfigurasi</Button>
               </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { label: "Konektivitas", value: detail.connectivity, icon: Wifi },
                { label: "Sumber Daya",  value: detail.power, icon: Zap },
                { label: "Tipe Perangkat",   value: detail.tipe, icon: Database },
                { label: "Kualitas Radio", value: detail.radio, icon: Signal },
              ].map(({ label, value, icon: Icon }, i) => (
                <div 
                  key={label} 
                  onMouseEnter={() => setHoveredSpec(i)}
                  onMouseLeave={() => setHoveredSpec(null)}
                  style={{
                    background: hoveredSpec === i ? "white" : "var(--gray-50)",
                    borderRadius: 18,
                    padding: "18px",
                    border: "1px solid",
                    borderColor: hoveredSpec === i ? "var(--green-200)" : "var(--gray-100)",
                    transition: "all 0.25s ease",
                    cursor: "default",
                    transform: hoveredSpec === i ? "translateY(-2px)" : "translateY(0)",
                    boxShadow: hoveredSpec === i ? "0 4px 16px rgba(34,197,94,0.06)" : "none",
                    animation: `staggerUp 0.4s ease ${i * 60}ms both`,
                    opacity: 0,
                  }}
                >
                  <p style={{ 
                    fontSize: 11, color: "var(--gray-400)", fontWeight: 700, textTransform: "uppercase", 
                    letterSpacing: "0.06em", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 
                  }}>
                    <Icon size={12} color={hoveredSpec === i ? "var(--green-500)" : "var(--gray-400)"} style={{ transition: "all 0.2s" }} /> {label}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-800)", lineHeight: 1.4 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Performance Analytics */}
            <div style={{ marginTop: 28 }}>
               <p style={{ fontSize: 11, fontWeight: 800, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Analitik Performa Langsung</p>
               <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                  {[
                    { label: "Kekuatan Sinyal", value: dev.signal === "Lemah" ? "3.1 dB" : "6.5 dB", status: dev.signal === "Lemah" ? "danger" : "ok", icon: Signal, pct: dev.signal === "Lemah" ? 30 : 85 },
                    { label: "Suhu Internal", value: "32.4°C", status: "ok", icon: Activity, pct: 65 },
                    { label: "Tautan Terenkripsi", value: "AES-256", status: "ok", icon: ShieldCheck, pct: 100 },
                  ].map(({ label, value, status, icon: Icon, pct }, i) => (
                    <div key={label} style={{
                      borderRadius: 18,
                      border: "1px solid",
                      borderColor: status === "ok" ? "var(--green-200)" : "#fca5a5",
                      background: status === "ok" ? "var(--green-50)" : "#fff1f1",
                      padding: "18px",
                      position: "relative",
                      transition: "all 0.25s ease",
                      animation: `staggerUp 0.4s ease ${i * 60}ms both`,
                      opacity: 0,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <p style={{ fontSize: 11, color: "var(--gray-600)", marginBottom: 8, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                        <Icon size={14} /> {label}
                      </p>
                      <p style={{ fontSize: 18, fontWeight: 800, color: status === "ok" ? "var(--green-700)" : "#dc2626", marginBottom: 10 }}>{value}</p>
                      <ProgressBar value={pct} height={4} color={status === "ok" ? "var(--green-400)" : "#f87171"} />
                      <div style={{ 
                        position: "absolute", top: 18, right: 18, width: 8, height: 8, borderRadius: "50%", 
                        background: status === "ok" ? "var(--green-500)" : "#ef4444",
                      }} className={status === "ok" ? "breathe" : ""} />
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
