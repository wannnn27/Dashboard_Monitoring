// pages/CropYieldPage.jsx
import { useState, useEffect } from "react";
import { Card, ProgressBar, Badge, Button, SectionTitle, AnimatedBarChart, AnimatedNumber } from "../components/ui";
import { MONTH_DATA, CONTAINERS, RECENT_UPDATES } from "../lib/data";
import { TrendingUp, ArrowUpRight, Leaf, BarChart3 } from "lucide-react";

const BADGE_VARIANT = { "badge-green": "green", "badge-blue": "blue", "badge-yellow": "yellow" };

export default function CropYieldPage() {
  const [hoveredRow, setHoveredRow] = useState(null);

  const chartData = MONTH_DATA.map(d => ({
    label: d.m,
    value: d.v,
    tooltip: `${d.v} tons`,
  }));

  return (
    <div className="page-transition" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

      {/* ── LEFT COLUMN ── */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Total Yield + Bar Chart */}
        <Card style={{ padding: 28, borderRadius: 24, animation: "staggerUp 0.5s ease both", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <p style={{ fontSize: 12, color: "var(--gray-400)", fontWeight: 600, marginBottom: 6 }}>Total Crop Yield · All active fields</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "var(--gray-900)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                  <AnimatedNumber value={256.3} duration={1000} />
                </span>
                <span style={{ fontSize: 16, color: "var(--gray-400)", marginBottom: 6, fontWeight: 600 }}>Tons</span>
                <div style={{
                  display: "flex", alignItems: "center", gap: 4,
                  background: "var(--green-50)",
                  padding: "4px 10px",
                  borderRadius: 99,
                  marginBottom: 6,
                  marginLeft: 8,
                }}>
                  <TrendingUp size={12} color="var(--green-600)" />
                  <span style={{ fontSize: 11, fontWeight: 800, color: "var(--green-600)" }}>+12.4%</span>
                </div>
              </div>
            </div>
            <Button variant="dark" size="sm" style={{ borderRadius: 12 }}>
              <BarChart3 size={14} /> Export
            </Button>
          </div>

          {/* Animated Bar Chart */}
          <AnimatedBarChart
            data={chartData}
            height={160}
            barColor="var(--green-300)"
            activeColor="var(--green-700)"
          />
        </Card>

        {/* Container Table */}
        <Card style={{ padding: 28, borderRadius: 24, animation: "staggerUp 0.5s ease 100ms both", opacity: 0 }}>
          <SectionTitle title="Production Overview" subtitle="Container yield and environmental metrics" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 140px 70px 70px",
              gap: 12, padding: "0 12px 12px",
              borderBottom: "1px solid var(--gray-100)",
              marginBottom: 4,
            }}>
              {["ID", "Plant Name", "Progress", "Temp", "Humidity"].map(h => (
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

      {/* ── RIGHT COLUMN ── */}
      <div style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Production Overview */}
        <Card style={{ padding: 24, borderRadius: 22, animation: "staggerUp 0.5s ease 50ms both", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)" }}>Production Overview</p>
            <ArrowUpRight size={16} color="var(--green-500)" />
          </div>
          <p style={{ fontSize: 11, color: "var(--gray-400)", marginBottom: 10, fontWeight: 500 }}>Estimated Revenue</p>
          <p style={{ fontSize: 28, fontWeight: 800, color: "var(--gray-900)", marginBottom: 20, letterSpacing: "-0.03em" }}>
            $<AnimatedNumber value={84300} duration={1200} prefix="" />
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Crop Growth Progress", pct: 70, color: "var(--green-400)" },
              { label: "Total Harvest Volume", pct: 45, color: "#fcd34d" },
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
            Harvest efficiency improved by 4.2% compared to last month due to better seasonal farming practices.
          </p>
        </Card>

        {/* Recent Updates */}
        <Card style={{ padding: 24, borderRadius: 22, animation: "staggerUp 0.5s ease 150ms both", opacity: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)", marginBottom: 18 }}>Recent Updates</p>
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

        {/* Field Insight — interactive mini chart */}
        <Card style={{ padding: 24, borderRadius: 22, animation: "staggerUp 0.5s ease 250ms both", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: "var(--gray-900)" }}>Field Insight</p>
          </div>
          <p style={{ fontSize: 11, color: "var(--gray-400)", marginBottom: 12, fontWeight: 500 }}>Water Usage Efficiency</p>
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

/* Mini sparkline chart */
function MiniSparkline() {
  const [mounted, setMounted] = useState(false);
  const values = [40, 60, 80, 55, 70, 90, 65];
  const max = Math.max(...values);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 40 }}>
      {values.map((h, i) => (
        <div 
          key={i} 
          style={{
            width: 10,
            height: mounted ? `${(h / max) * 100}%` : "0%",
            background: `linear-gradient(180deg, var(--green-500), var(--green-300))`,
            borderRadius: "4px 4px 2px 2px",
            transition: `height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 50}ms`,
            cursor: "pointer",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scaleY(1.1)";
            e.currentTarget.style.background = "var(--green-600)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scaleY(1)";
            e.currentTarget.style.background = "linear-gradient(180deg, var(--green-500), var(--green-300))";
          }}
        />
      ))}
    </div>
  );
}
