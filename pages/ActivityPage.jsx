// pages/ActivityPage.jsx
import { useState, useEffect } from "react";
import { Card, Button, ProgressBar, SectionTitle, AnimatedBarChart, AnimatedNumber } from "../components/ui";
import { Sparkles, CloudSun, Droplets, Leaf, Wind, Thermometer, Zap, RefreshCw } from "lucide-react";

const SOIL_BARS = [
  { label: "N",  value: 60, color: "var(--green-400)", fullLabel: "Nitrogen" },
  { label: "P",  value: 40, color: "#fbbf24", fullLabel: "Phosphorus" },
  { label: "K",  value: 75, color: "var(--green-500)", fullLabel: "Potassium" },
  { label: "pH", value: 55, color: "#60a5fa", fullLabel: "pH Level" },
  { label: "Ca", value: 90, color: "var(--green-300)", fullLabel: "Calcium" },
  { label: "Mg", value: 45, color: "#f87171", fullLabel: "Magnesium" },
];

const WEATHER_DATA = [
  { label: "Sun", value: 28, tooltip: "28°C" },
  { label: "Mon", value: 26, tooltip: "26°C" },
  { label: "Tue", value: 30, tooltip: "30°C" },
  { label: "Wed", value: 25, tooltip: "25°C" },
  { label: "Thu", value: 27, tooltip: "27°C" },
  { label: "Fri", value: 29, tooltip: "29°C" },
  { label: "Sat", value: 28, tooltip: "28°C" },
];

export default function ActivityPage() {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(
    "Overall performance indicates efficient investment management and strong harvest productivity this season. Soil pH levels are within optimal range. Irrigation cycles adjusted for maximum water efficiency."
  );
  const [hoveredSoil, setHoveredSoil] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleRegenerate = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiResult("AI analysis complete: Nitrogen levels remain stable. Recommend increasing irrigation frequency by 15% in Zone B. Predicted yield increase of 8% this quarter based on current growth trajectory.");
      setAiLoading(false);
    }, 1500);
  };

  return (
    <div className="page-transition" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

      {/* ── LEFT COLUMN ── */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Crop Overview visual */}
        <Card style={{ overflow: "hidden", borderRadius: 24, animation: "staggerUp 0.5s ease both", opacity: 0 }}>
          <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid var(--gray-50)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 16, fontWeight: 800, color: "var(--gray-900)", letterSpacing: "-0.02em" }}>Farm Overview</p>
              <p style={{ fontSize: 12, color: "var(--gray-400)", marginTop: 3, fontWeight: 500 }}>AI-powered analytics and growth monitoring</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{
                background: "var(--gray-50)", border: "1.5px solid var(--gray-100)",
                borderRadius: 12, padding: "6px 14px",
                fontSize: 12, color: "var(--gray-600)", fontWeight: 600,
              }}>Mon, 22 Jul</div>
              <Button variant="dark" size="sm" style={{ borderRadius: 12 }}>Export</Button>
            </div>
          </div>

          <div style={{
            background: "linear-gradient(180deg, #fef9f0 0%, #f0fdf4 100%)",
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Subtle radial glow */}
            <div style={{
              position: "absolute",
              width: 300, height: 300,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(34,197,94,0.08), transparent 70%)",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
            }} />

            {/* Crop label tags */}
            {[
              { label: "Plant Health", left: "12%", top: "20%", color: "var(--green-600)", bg: "var(--green-100)", icon: Leaf },
              { label: "Crop Growth",  left: "55%", top: "12%", color: "var(--green-700)", bg: "var(--green-200)", icon: Zap },
              { label: "Irrigation Plan", left: "22%", top: "72%", color: "#1d4ed8", bg: "#dbeafe", icon: Droplets },
              { label: "Moisture OK", left: "68%", top: "68%", color: "#059669", bg: "#d1fae5", icon: Wind },
            ].map(({ label, left, top, color, bg, icon: Icon }, i) => (
              <div 
                key={label} 
                style={{
                  position: "absolute", left, top,
                  display: "flex", alignItems: "center", gap: 6,
                  animation: `staggerUp 0.4s ease ${200 + i * 80}ms both`,
                  opacity: 0,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <span style={{
                  fontSize: 11, fontWeight: 700, color,
                  background: bg, padding: "5px 12px", borderRadius: 99,
                  display: "flex", alignItems: "center", gap: 5,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                  <Icon size={12} />
                  {label}
                </span>
              </div>
            ))}
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <p style={{ fontSize: 13, color: "var(--green-700)", fontWeight: 700, marginBottom: 4 }}>Hydroponic Growth Cycle</p>
              <p style={{ fontSize: 12, color: "var(--gray-400)", fontWeight: 500 }}>Week 6 of 12 · All systems nominal</p>
            </div>
          </div>
        </Card>

        {/* Weather + Soil row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* Weather */}
          <Card style={{ padding: 24, borderRadius: 22, animation: "staggerUp 0.5s ease 100ms both", opacity: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)" }}>Weather Forecast</p>
                <p style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 2, fontWeight: 500 }}>Real-time farm weather insights</p>
              </div>
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <CloudSun size={18} color="#f59e0b" />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 38, fontWeight: 800, color: "var(--gray-900)", lineHeight: 1 }}>
                <AnimatedNumber value={28} duration={600} />
              </span>
              <div style={{ marginBottom: 4 }}>
                <p style={{ fontSize: 13, color: "var(--gray-600)", fontWeight: 700 }}>°C · Cloudy</p>
                <p style={{ fontSize: 11, color: "var(--gray-400)", fontWeight: 500 }}>Feels like 30°C</p>
              </div>
            </div>
            <AnimatedBarChart
              data={WEATHER_DATA}
              height={60}
              barColor="var(--green-200)"
              activeColor="var(--green-500)"
            />
          </Card>

          {/* Soil */}
          <Card style={{ padding: 24, borderRadius: 22, animation: "staggerUp 0.5s ease 200ms both", opacity: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)" }}>Soil Condition</p>
                <p style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 2, fontWeight: 500 }}>Soil nutrients and moisture overview</p>
              </div>
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                background: "var(--green-50)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Leaf size={18} color="var(--green-600)" />
              </div>
            </div>

            <div style={{ position: "relative" }}>
              {/* Tooltip for hovered bar */}
              {hoveredSoil !== null && (
                <div style={{
                  position: "absolute",
                  top: -32,
                  left: `${(hoveredSoil / SOIL_BARS.length) * 100 + 100 / (SOIL_BARS.length * 2)}%`,
                  transform: "translateX(-50%)",
                  background: "var(--gray-800)",
                  color: "white",
                  fontSize: 10, fontWeight: 700,
                  padding: "4px 10px", borderRadius: 8,
                  whiteSpace: "nowrap",
                  zIndex: 10,
                  animation: "slideUpFade 0.15s ease-out",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}>
                  {SOIL_BARS[hoveredSoil].fullLabel}: {SOIL_BARS[hoveredSoil].value}%
                  <div style={{
                    position: "absolute",
                    bottom: -3,
                    left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    width: 6, height: 6,
                    background: "var(--gray-800)",
                  }} />
                </div>
              )}

              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
                {SOIL_BARS.map(({ label, value, color }, i) => (
                  <div 
                    key={label} 
                    style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}
                    onMouseEnter={() => setHoveredSoil(i)}
                    onMouseLeave={() => setHoveredSoil(null)}
                  >
                    <div style={{
                      width: "100%",
                      height: mounted ? `${value}%` : "0%",
                      background: hoveredSoil === i 
                        ? `linear-gradient(180deg, ${color}, ${color}99)` 
                        : color,
                      borderRadius: "6px 6px 2px 2px",
                      marginTop: "auto",
                      transition: `height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 60}ms, background 0.2s ease`,
                      cursor: "pointer",
                      transform: hoveredSoil === i ? "scaleX(1.12)" : "scaleX(1)",
                      boxShadow: hoveredSoil === i ? `0 4px 12px ${color}40` : "none",
                    }} />
                    <span style={{ 
                      fontSize: 10, 
                      color: hoveredSoil === i ? "var(--gray-700)" : "var(--gray-400)", 
                      fontWeight: hoveredSoil === i ? 800 : 500,
                      transition: "all 0.2s ease",
                    }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ── AI PANEL ── */}
      <div style={{ width: 300, flexShrink: 0 }}>
        <Card style={{ padding: 24, borderRadius: 22, animation: "staggerUp 0.5s ease 150ms both", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: "linear-gradient(135deg, var(--green-500), #34d399)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white",
            }}>
              <Sparkles size={16} />
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: "var(--gray-900)" }}>Area Prediction</p>
              <p style={{ fontSize: 11, color: "var(--gray-400)", fontWeight: 500 }}>AI model analysis</p>
            </div>
          </div>

          {/* Prediction bars */}
          <div style={{ marginTop: 16, marginBottom: 12 }}>
            <PredictionChart />
          </div>
          <p style={{ fontSize: 12, color: "var(--gray-600)", marginBottom: 18, lineHeight: 1.6, fontWeight: 500 }}>
            <span style={{ fontWeight: 800, color: "var(--green-600)" }}>56%</span> production increase projected based on AI model
          </p>

          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            <Button variant="primary" size="sm" onClick={handleRegenerate} style={{ flex: 1, borderRadius: 12 }}>
              <Sparkles size={14} /> AI Insight
            </Button>
            <Button variant="outline" size="sm" onClick={handleRegenerate} style={{ flex: 1, borderRadius: 12 }}>
              <RefreshCw size={14} /> Regenerate
            </Button>
          </div>

          {/* Prompt */}
          <div style={{
            background: "#fffbeb",
            border: "1px solid #fef08a",
            borderRadius: 14,
            padding: 14,
            marginBottom: 14,
          }}>
            <p style={{ fontSize: 11, color: "var(--gray-600)", lineHeight: 1.6, fontStyle: "italic", fontWeight: 500 }}>
              "Act as an agriculture analytics system generating a Smart Yield Insights summary per crop."
            </p>
          </div>

          {/* AI Result */}
          <div style={{
            background: "var(--green-50)",
            border: "1px solid var(--green-200)",
            borderRadius: 14,
            padding: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6,
                background: "var(--green-500)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontSize: 10, fontWeight: 700, flexShrink: 0,
              }}>✓</div>
              <p style={{ fontSize: 13, fontWeight: 800, color: "var(--gray-900)" }}>Smart Yield Insights</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              {[["Seasonal Cost", "$400,275.5k"], ["Total Yield", "52,600 kg"]].map(([l, v]) => (
                <div key={l} style={{ 
                  background: "white", padding: "10px 12px", borderRadius: 10,
                  border: "1px solid var(--green-100)",
                }}>
                  <p style={{ fontSize: 10, color: "var(--gray-400)", marginBottom: 3, fontWeight: 600 }}>{l}</p>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "var(--gray-900)", fontFamily: "'JetBrains Mono', monospace" }}>{v}</p>
                </div>
              ))}
            </div>

            {aiLoading ? (
              <div style={{ display: "flex", gap: 4, padding: "8px 0", justifyContent: "center" }}>
                {[0, 0.15, 0.3].map((delay, i) => (
                  <div key={i} style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: "var(--green-400)",
                    animation: `bounce 0.8s ease-in-out ${delay}s infinite`,
                  }} />
                ))}
                <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)} }`}</style>
              </div>
            ) : (
              <p style={{ fontSize: 12, color: "var(--gray-600)", lineHeight: 1.7, fontWeight: 500 }}>{aiResult}</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* Animated prediction chart */
function PredictionChart() {
  const [mounted, setMounted] = useState(false);
  const values = [50, 70, 40, 80, 60, 90, 55, 75, 45, 85];
  const max = Math.max(...values);
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 70 }}>
      {values.map((h, i) => (
        <div 
          key={i} 
          style={{
            flex: 1,
            height: mounted ? `${(h / max) * 100}%` : "0%",
            background: hoveredBar === i 
              ? "var(--green-600)" 
              : `rgba(34, 197, 94, ${0.25 + h / 200})`,
            borderRadius: "5px 5px 2px 2px",
            transition: `height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 40}ms, background 0.2s ease`,
            cursor: "pointer",
            transform: hoveredBar === i ? "scaleX(1.15)" : "scaleX(1)",
          }}
          onMouseEnter={() => setHoveredBar(i)}
          onMouseLeave={() => setHoveredBar(null)}
        />
      ))}
    </div>
  );
}
