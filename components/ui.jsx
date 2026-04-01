// components/ui.jsx
// Reusable primitive components used across all pages
import { useState, useEffect, useRef } from "react";

export function Card({ children, style = {}, onClick, className = "", hover = false }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onClick={onClick}
      className={className}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
      style={{
        background: "var(--white)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--gray-100)",
        boxShadow: isHovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Badge({ label, variant = "gray" }) {
  const map = {
    green:  { background: "var(--green-100)",  color: "var(--green-700)"  },
    blue:   { background: "#dbeafe",            color: "#1d4ed8"            },
    yellow: { background: "#fef9c3",            color: "#92400e"            },
    red:    { background: "#fee2e2",            color: "#991b1b"            },
    gray:   { background: "var(--gray-100)",   color: "var(--gray-600)"   },
  };
  const s = map[variant] || map.gray;
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "3px 10px",
      borderRadius: 99,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.02em",
      ...s,
    }}>{label}</span>
  );
}

export function Button({ children, variant = "primary", size = "md", onClick, style = {} }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const base = {
    borderRadius: "var(--radius-md)",
    fontFamily: "'Sora', sans-serif",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "none",
    transform: isHovered ? "translateY(-1px)" : "translateY(0)",
  };
  const sizes = {
    sm: { fontSize: 11, padding: "6px 14px" },
    md: { fontSize: 12, padding: "10px 18px" },
    lg: { fontSize: 13, padding: "12px 24px" },
  };
  const variants = {
    primary: { 
      background: isHovered ? "var(--green-600)" : "var(--green-500)", 
      color: "white", 
      boxShadow: isHovered ? "0 6px 20px rgba(34,197,94,0.3)" : "0 2px 8px rgba(34,197,94,0.15)" 
    },
    dark: { 
      background: isHovered ? "var(--gray-700)" : "var(--gray-900)", 
      color: "white", 
      boxShadow: isHovered ? "0 6px 20px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.1)" 
    },
    outline: { 
      background: isHovered ? "var(--gray-50)" : "transparent", 
      color: "var(--gray-700)", 
      border: "1.5px solid var(--gray-200)" 
    },
    ghost: { 
      background: isHovered ? "var(--gray-50)" : "transparent", 
      color: isHovered ? "var(--gray-700)" : "var(--gray-500)" 
    },
    danger: { 
      background: isHovered ? "#fca5a5" : "#fee2e2", 
      color: "#991b1b" 
    },
  };
  return (
    <button 
      onClick={onClick} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}

export function ProgressBar({ value, color = "var(--green-400)", height = 6, style = {}, animated = true }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div ref={ref} style={{
      height, borderRadius: 99,
      background: "var(--gray-100)",
      overflow: "hidden",
      ...style,
    }}>
      <div style={{
        height: "100%",
        width: `${Math.min(100, width)}%`,
        background: animated 
          ? `linear-gradient(90deg, ${color}, ${color}dd)` 
          : color,
        borderRadius: 99,
        transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
      }}>
        {animated && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            animation: "shimmer 2s ease-in-out infinite",
            backgroundSize: "200% 100%",
          }} />
        )}
      </div>
    </div>
  );
}

export function SectionTitle({ title, subtitle, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--gray-900)", letterSpacing: "-0.02em" }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 12, color: "var(--gray-400)", marginTop: 3, fontWeight: 500 }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, sub, accent = false, icon: Icon, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card style={{ 
      padding: 24, 
      animation: `staggerUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms forwards`,
      opacity: 0,
      transition: "all 0.3s ease",
      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      boxShadow: isHovered ? "var(--shadow-md)" : "var(--shadow-sm)",
      cursor: "default",
    }}
    >
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ height: "100%" }}
      >
        {Icon && (
          <div style={{ 
            width: 48, height: 48, borderRadius: 14, 
            background: accent ? "var(--green-50)" : "var(--gray-50)", 
            display: "flex", alignItems: "center", justifyContent: "center", 
            color: accent ? "var(--green-600)" : "var(--gray-700)",
            marginBottom: 16,
            transition: "all 0.3s ease",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}>
            <Icon size={24} />
          </div>
        )}
        <p style={{ fontSize: 11, color: "var(--gray-400)", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
        <p style={{
          fontSize: 36, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em",
          color: accent ? "var(--green-600)" : "var(--gray-900)",
          transition: "all 0.3s ease",
        }}>{value}</p>
        {sub && <p style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 10, lineHeight: 1.5, fontWeight: 500 }}>{sub}</p>}
      </div>
    </Card>
  );
}

/* Interactive animated bar chart component */
/* Smooth animated area/wave chart component */
export function AnimatedAreaChart({ data, height = 160, color = "var(--green-500)", showLabels = true }) {
  const [mounted, setMounted] = useState(false);
  const max = Math.max(1, ...data.map(d => d.value));

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const points = data.map((item, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (item.value / max) * 100;
    return `${x},${y}`;
  });

  const pathData = points.join(" ");
  const areaData = `0,100 ${pathData} 100,100`;

  return (
    <div style={{ position: "relative", width: "100%", height }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d={`M ${areaData}`}
          fill="url(#areaGradient)"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        />

        <path
          d={`M ${pathData}`}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 400,
            strokeDashoffset: mounted ? 0 : 400,
            transition: "stroke-dashoffset 1.5s var(--transition-smooth)",
          }}
        />

        {/* Data points */}
        {data.map((item, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - (item.value / max) * 100;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2.5"
              fill="white"
              stroke={color}
              strokeWidth="2"
              style={{
                opacity: mounted ? 1 : 0,
                transform: `scale(${mounted ? 1 : 0})`,
                transition: `all 0.3s ease ${0.5 + i * 0.1}s`,
                transformOrigin: `${x}% ${y}%`,
              }}
            />
          );
        })}
      </svg>
      {showLabels && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          {data.map((item, i) => (
            <span key={i} style={{ fontSize: 10, color: "var(--gray-400)", fontWeight: 600 }}>
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function AnimatedBarChart({ data, height = 160, barColor = "var(--green-400)", activeColor = "var(--green-600)", showLabels = true }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const max = Math.max(1, ...data.map(d => d.value));

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height, position: "relative" }}>
      {data.map((item, i) => {
        const pct = (item.value / max) * 100;
        const isHovered = hoveredIndex === i;
        const isMax = item.value === max;
        return (
          <div 
            key={i} 
            style={{ 
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", 
              gap: 6, height: "100%", position: "relative" 
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip */}
            {isHovered && (
              <div style={{
                position: "absolute",
                top: `calc(${100 - pct}% - 36px)`,
                background: "var(--gray-800)",
                color: "white",
                padding: "4px 10px",
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 700,
                whiteSpace: "nowrap",
                zIndex: 10,
                animation: "slideUpFade 0.15s ease-out",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}>
                {item.tooltip || item.value}
                <div style={{
                  position: "absolute",
                  bottom: -3,
                  left: "50%",
                  transform: "translateX(-50%) rotate(45deg)",
                  width: 6,
                  height: 6,
                  background: "var(--gray-800)",
                }} />
              </div>
            )}
            <div style={{
              width: "100%",
              height: `${pct}%`,
              background: isHovered 
                ? `linear-gradient(180deg, ${activeColor}, ${activeColor}cc)` 
                : isMax 
                  ? `linear-gradient(180deg, ${activeColor}, ${activeColor}99)` 
                  : `linear-gradient(180deg, ${barColor}, ${barColor}99)`,
              borderRadius: "10px 10px 4px 4px",
              marginTop: "auto",
              transition: `height 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 60}ms, background 0.2s ease`,
              cursor: "pointer",
              transform: isHovered ? "scaleX(1.08)" : "scaleX(1)",
              boxShadow: isHovered ? `0 6px 16px ${barColor}40` : "none",
            }} />
            {showLabels && (
              <span style={{ 
                fontSize: 10, 
                color: isHovered ? "var(--gray-700)" : "var(--gray-400)", 
                fontWeight: isHovered ? 700 : 500,
                transition: "all 0.2s ease",
              }}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* Animated number counter */
export function AnimatedNumber({ value, duration = 1000, prefix = "", suffix = "" }) {
  const [current, setCurrent] = useState(0);
  const numValue = parseFloat(value) || 0;
  const isInt = Number.isInteger(numValue);

  useEffect(() => {
    let startTimestamp = null;
    let frameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const nextValue = progress * numValue;
      setCurrent(nextValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [numValue, duration]);

  const display = isInt ? Math.round(current) : current.toFixed(1);

  return <span>{prefix}{display}{suffix}</span>;
}
