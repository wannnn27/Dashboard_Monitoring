// components/Sidebar.jsx
import { useState } from "react";
import { NAV_ITEMS } from "../lib/data";
import * as LucideIcons from "lucide-react";

export default function Sidebar({ active, setActive }) {
  const [hoveredKey, setHoveredKey] = useState(null);

  return (
    <aside style={{
      position: "fixed",
      left: 20, top: 80,
      width: 62,
      height: "calc(100vh - 100px)",
      background: "var(--white)",
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "16px 0",
      zIndex: 40,
      boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
      border: "1px solid var(--gray-100)",
      transition: "box-shadow 0.3s ease",
    }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        {NAV_ITEMS.map(({ key, label, icon }) => {
          const isActive = active === key;
          const isHovered = hoveredKey === key;
          const IconComponent = LucideIcons[icon] || LucideIcons.Circle;
          return (
            <div key={key} style={{ position: "relative" }}>
              <button
                onClick={() => setActive(key)}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isActive
                    ? "linear-gradient(135deg, var(--gray-800), var(--gray-900))"
                    : isHovered ? "var(--gray-50)" : "transparent",
                  color: isActive ? "white" : isHovered ? "var(--green-600)" : "var(--gray-400)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: "none",
                  transform: isActive ? "scale(1)" : isHovered ? "scale(1.08)" : "scale(1)",
                  boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
                }}
              >
                <IconComponent size={20} strokeWidth={isActive ? 2.5 : 2} />
              </button>

              {/* Tooltip */}
              {isHovered && !isActive && (
                <div style={{
                  position: "absolute",
                  left: "calc(100% + 14px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "var(--gray-800)",
                  color: "white",
                  padding: "6px 14px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  zIndex: 100,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  animation: "slideInRight 0.15s ease-out",
                  pointerEvents: "none",
                }}>
                  {label}
                  <div style={{
                    position: "absolute",
                    left: -4,
                    top: "50%",
                    transform: "translateY(-50%) rotate(45deg)",
                    width: 8,
                    height: 8,
                    background: "var(--gray-800)",
                    borderRadius: 1,
                  }} />
                </div>
              )}

              {/* Active indicator dot */}
              {isActive && (
                <div style={{
                  position: "absolute",
                  right: -8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 4,
                  height: 20,
                  borderRadius: 99,
                  background: "var(--green-500)",
                  boxShadow: "0 0 8px rgba(34,197,94,0.4)",
                }} />
              )}
            </div>
          );
        })}
      </nav>
      
      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ width: 28, height: 1, background: "var(--gray-100)", margin: "0 auto 8px" }} />
        <div style={{ position: "relative" }}>
          <button 
            onMouseEnter={() => setHoveredKey("settings")}
            onMouseLeave={() => setHoveredKey(null)}
            style={{
              width: 42, height: 42, borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: hoveredKey === "settings" ? "var(--green-600)" : "var(--gray-400)",
              transition: "all 0.3s",
              background: hoveredKey === "settings" ? "var(--gray-50)" : "transparent",
              transform: hoveredKey === "settings" ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            <LucideIcons.Settings size={20} />
          </button>
          {hoveredKey === "settings" && (
            <div style={{
              position: "absolute",
              left: "calc(100% + 14px)",
              top: "50%",
              transform: "translateY(-50%)",
              background: "var(--gray-800)",
              color: "white",
              padding: "6px 14px",
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              whiteSpace: "nowrap",
              zIndex: 100,
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              animation: "slideInRight 0.15s ease-out",
              pointerEvents: "none",
            }}>
              Pengaturan
              <div style={{
                position: "absolute",
                left: -4,
                top: "50%",
                transform: "translateY(-50%) rotate(45deg)",
                width: 8,
                height: 8,
                background: "var(--gray-800)",
                borderRadius: 1,
              }} />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
