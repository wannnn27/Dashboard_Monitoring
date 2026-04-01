// pages/CropYieldPage.jsx
import { useState, useEffect } from "react";
import { Card, ProgressBar, Badge, Button, SectionTitle, AnimatedNumber } from "../components/ui";
import { MONTH_DATA, CONTAINERS, RECENT_UPDATES } from "../lib/data";
import { TrendingUp, ArrowUpRight, Leaf, BarChart3 } from "lucide-react";

const BADGE_VARIANT = { "badge-green": "green", "badge-blue": "blue", "badge-yellow": "yellow" };

/* Self-contained bar chart — no mount-timing issues */
function CropBarChart({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const max = Math.max(...data.map(d => d.value));
  const chartHeight = 160;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: chartHeight, position: "relative" }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((pct) => (
          <div key={pct} style={{
            position: "absolute", left: 0, right: 0,
            bottom: `${pct * 100}%`,
            borderTop: "1px dashed var(--gray-100)",
            pointerEvents: "none", zIndex: 0,
          }} />
        ))}

        {data.map((item, i) => {
          const pct = (item.value / max) * 100;
          const isHov = hoveredIndex === i;
          const isPeak = item.value === max;

          return (
            <div
              key={i}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", position: "relative", zIndex: 1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              {isHov && (
                <div style={{
                  position: "absolute",
                  bottom: `calc(${pct}% + 10px)`,
                  left: "50%", transform: "translateX(-50%)",
                  background: "var(--gray-800)", color: "white",
                  padding: "4px 10px", borderRadius: 8,
                  fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  pointerEvents: "none", zIndex: 10,
                }}>
                  {item.tooltip || item.value}
                  <div style={{
                    position: "absolute", bottom: -3, left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    width: 6, height: 6, background: "var(--gray-800)",
                  }} />
                </div>
              )}

              {/* Bar */}
              <div style={{
                width: "100%",
                height: `${pct}%`,
                marginTop: "auto",
                borderRadius: "10px 10px 4px 4px",
                background: isHov
                  ? "linear-gradient(180deg, #15803d, #16a34a)"
                  : isPeak
                    ? "linear-gradient(180deg, #16a34a, #22c55e)"
                    : "linear-gradient(180deg, #4ade80, #86efac)",
                transition: "background 0.2s ease",
                transform: isHov ? "scaleX(1.08)" : "scaleX(1)",
                boxShadow: isHov
                  ? "0 6px 20px rgba(34,197,94,0.35)"
                  : isPeak ? "0 4px 12px rgba(34,197,94,0.2)" : "none",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}>
                {isHov && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(180deg, rgba(255,255,255,0.15), transparent)",
                    borderRadius: "inherit",
                  }} />
                )}
              </div>

              {/* X label */}
              <span style={{
                fontSize: 10,
                color: isHov ? "var(--gray-700)" : isPeak ? "var(--green-600)" : "var(--gray-400)",
                fontWeight: isHov || isPeak ? 800 : 500,
                transition: "all 0.2s",
              }}>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom axis hint */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <span style={{ fontSize: 10, color: "var(--gray-300)", fontWeight: 600 }}>0 ton</span>
        <span style={{ fontSize: 10, color: "var(--green-600)", fontWeight: 700 }}>
          ↑ {max} ton peak
        </span>
      </div>
    </div>
  );
}

/* Mini sparkline */
function MiniSparkline() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const values = [40, 60, 80, 55, 70, 90, 65];
  const max = Math.max(...values);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 40 }}>
      {values.map((h, i) => (
        <div
          key={i}
          style={{
            width: 10,
            height: `${(h / max) * 100}%`,
            background: hoveredIdx === i
              ? "var(--green-600)"
              : "linear-gradient(180deg, var(--green-500), var(--green-300))",
            borderRadius: "4px 4px 2px 2px",
            cursor: "pointer",
            transition: "background 0.2s, transform 0.2s",
            transform: hoveredIdx === i ? "scaleY(1.1)" : "scaleY(1)",
          }}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
        />
      ))}
    </div>
  );
}

export default function CropYieldPage() {
  const [hoveredRow, setHoveredRow] = useState(null);

  const chartData = MONTH_DATA.map(d => ({
    label: d.m,
    value: d.v,
    tooltip: `${d.v} ton`,
  }));

  return (
    <div className="page-transition" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

      {/* ── KOLOM KIRI ── */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Total Hasil Panen + Diagram Batang */}
        <Card style={{ padding: 28, borderRadius: 24, animation: "staggerUp 0.5s ease both", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <p style={{ fontSize: 12, color: "var(--gray-400)", fontWeight: 600, marginBottom: 6 }}>Total Hasil Panen · Semua lahan aktif</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "var(--gray-900)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                  <AnimatedNumber value={256.3} duration={1000} />
                </span>
                <span style={{ fontSize: 16, color: "var(--gray-400)", marginBottom: 6, fontWeight: 600 }}>Ton</span>
                <div style={{
                   display: "flex", alignItems: "center", gap: 4,
                   background: "var(--green-50)", padding: "4px 10px",
                   borderRadius: 99, marginBottom: 6, marginLeft: 8,
                }}>
                  <TrendingUp size={12} color="var(--green-600)" />
                  <span style={{ fontSize: 11, fontWeight: 800, color: "var(--green-600)" }}>+12.4%</span>
                </div>
              </div>
            </div>
            <Button variant="dark" size="sm" style={{ borderRadius: 12 }}>
              <BarChart3 size={14} /> Ekspor
            </Button>
          </div>

          {/* Diagram batang inline */}
          <CropBarChart data={chartData} />
        </Card>

        {/* Tabel Kontainer */}
        <Card style={{ padding: 28, borderRadius: 24, animation: "staggerUp 0.5s ease 100ms both", opacity: 0 }}>
          <SectionTitle title="Rincian Produksi" subtitle="Hasil wadah dan metrik lingkungan" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
              gap: 12, padding: "0 12px 12px",
              borderBottom: "1px solid var(--gray-100)",
              marginBottom: 4,
            }}>
              {["ID", "Tanaman", "Progres", "Suhu", "Lembap"].map(h => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
              ))}
            </div>
            {CONTAINERS.map((c, i) => (
              <div
                key={c.id}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 140px 70px 70px",
                  gap: 12,
                  alignItems: "center",
                  padding: "14px 12px",
                  borderBottom: "1px solid var(--gray-50)",
                  borderRadius: 12,
                  background: hoveredRow === i ? "var(--gray-50)" : "transparent",
                  transition: "all 0.2s ease",
                  cursor: "default",
                  animation: `staggerUp 0.4s ease ${100 + i * 60}ms both`,
                  opacity: 0,
                }}
              >
                <span style={{ fontSize: 12, color: "var(--gray-500)", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
                  {c.id}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: "var(--green-50)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--green-600)",
                  }}>
                    <Leaf size={14} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-800)" }}>{c.name}</span>
                </div>
                <div>
                   <ProgressBar
                     value={c.pct}
                     height={5}
                     color={c.pct < 30 ? "#f87171" : c.pct < 60 ? "#fbbf24" : "var(--green-400)"}
                   />
                   <span style={{ fontSize: 10, color: "var(--gray-400)", marginTop: 3, display: "block", fontWeight: 600 }}>{c.pct}%</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--gray-600)", fontWeight: 600 }}>{c.temp}°F</span>
                <span style={{ fontSize: 12, color: "var(--gray-600)", fontWeight: 600 }}>{c.hum}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── KOLOM KANAN ── */}
      <div style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Ringkasan Keuntungan */}
        <Card style={{ padding: 24, borderRadius: 22, animation: "staggerUp 0.5s ease 50ms both", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)" }}>Ringkasan Hasil</p>
            <ArrowUpRight size={16} color="var(--green-500)" />
          </div>
          <p style={{ fontSize: 11, color: "var(--gray-400)", marginBottom: 10, fontWeight: 500 }}>Estimasi Pendapatan</p>
          <p style={{ fontSize: 28, fontWeight: 800, color: "var(--gray-900)", marginBottom: 20, letterSpacing: "-0.03em" }}>
            $<AnimatedNumber value={84300} duration={1200} prefix="" />
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
               { label: "Progres Pertumbuhan", pct: 70, color: "var(--green-400)" },
               { label: "Volume Panen Total", pct: 45, color: "#fcd34d" },
            ].map(({ label, pct, color }) => (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: "var(--gray-600)", fontWeight: 600 }}>{label}</span>
                  <span style={{ fontSize: 11, color: "var(--gray-800)", fontWeight: 800 }}>{pct}%</span>
                </div>
                <ProgressBar value={pct} color={color} height={6} />
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 16, lineHeight: 1.6, fontWeight: 500 }}>
            Efisiensi panen meningkat sebesar 4.2% dibandingkan bulan lalu karena praktik pertanian musiman yang lebih baik.
          </p>
        </Card>

        {/* Update Terbaru */}
        <Card style={{ padding: 24, borderRadius: 22, animation: "staggerUp 0.5s ease 150ms both", opacity: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)", marginBottom: 18 }}>Pembaruan Terkini</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {RECENT_UPDATES.map((u, i) => (
              <div
                key={i}
                style={{
                  display: "flex", flexDirection: "column", gap: 6,
                  animation: `staggerUp 0.4s ease ${200 + i * 60}ms both`,
                  opacity: 0,
                }}
              >
                <p style={{ fontSize: 12, color: "var(--gray-800)", fontWeight: 700 }}>{u.label}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Badge label={u.badge} variant={BADGE_VARIANT[u.badgeClass]} />
                  <span style={{ fontSize: 10, color: "var(--gray-400)", fontWeight: 500 }}>{u.time}</span>
                </div>
                {i < RECENT_UPDATES.length - 1 && (
                  <div style={{ borderBottom: "1px solid var(--gray-50)", marginTop: 4 }} />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Wawasan Lahan */}
        <Card style={{ padding: 24, borderRadius: 22, animation: "staggerUp 0.5s ease 250ms both", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)" }}>Analisis Lahan</p>
          </div>
          <p style={{ fontSize: 11, color: "var(--gray-400)", marginBottom: 12, fontWeight: 500 }}>Efisiensi Penggunaan Air</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
            <span style={{ fontSize: 38, fontWeight: 800, color: "var(--gray-900)", lineHeight: 1 }}>
              <AnimatedNumber value={78} duration={800} />
            </span>
            <MiniSparkline />
          </div>
        </Card>
      </div>
    </div>
  );
}