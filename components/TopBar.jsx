// components/TopBar.jsx
import { useState, useEffect } from "react";
import { Search, Bell, ExternalLink, Clock, X, Sprout, ChevronDown } from "lucide-react";
import { NOTIFICATIONS } from "../lib/data";

function NotificationPanel({ isOpen, onToggle }) {
  if (!isOpen) return null;
  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onToggle}
        style={{
          position: "fixed", inset: 0, zIndex: 55,
          background: "transparent",
        }} 
      />
      <div style={{
        position: "fixed", top: 80, right: 30, width: 360, background: "white",
        borderRadius: 20, border: "1px solid var(--gray-100)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.04)", zIndex: 60,
        animation: "slideUpFade 0.25s cubic-bezier(0.4, 0, 0.2, 1)", overflow: "hidden"
      }}>
        <div style={{ 
          padding: "20px 24px", 
          borderBottom: "1px solid var(--gray-50)", 
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "linear-gradient(180deg, var(--gray-50) 0%, white 100%)"
        }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--gray-900)", letterSpacing: "-0.01em" }}>Notifications</h3>
            <p style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 2, fontWeight: 500 }}>{NOTIFICATIONS.length} unread</p>
          </div>
          <button 
            onClick={onToggle} 
            style={{ 
              color: "var(--gray-400)", padding: 6, borderRadius: 10,
              transition: "all 0.2s",
              background: "transparent",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--gray-100)"; e.currentTarget.style.color = "var(--gray-600)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gray-400)"; }}
          >
            <X size={18} />
          </button>
        </div>
        <div style={{ maxHeight: 380, overflowY: "auto", padding: "4px 0" }}>
          {NOTIFICATIONS.map((n, i) => (
            <div 
              key={i} 
              style={{ 
                padding: "14px 24px", display: "flex", gap: 14, cursor: "pointer", 
                transition: "all 0.2s", borderLeft: "3px solid transparent",
                animation: `slideUpFade 0.3s ease ${i * 50}ms both`,
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.background = "var(--gray-50)"; 
                e.currentTarget.style.borderLeftColor = "var(--green-400)";
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.background = "white"; 
                e.currentTarget.style.borderLeftColor = "transparent";
              }}
            >
              <div style={{ 
                width: 42, height: 42, borderRadius: 14, background: n.color, 
                display: "flex", alignItems: "center", justifyContent: "center", 
                color: "white", fontSize: 13, fontWeight: 800, flexShrink: 0,
                boxShadow: `0 4px 12px ${n.color}40`,
              }}>
                {n.initials}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, color: "var(--gray-800)", lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 800 }}>{n.name}</span>{" "}
                  {n.action}{" "}
                  <span style={{ fontWeight: 700, color: "var(--gray-900)" }}>{n.target}</span>
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                  <Clock size={10} color="var(--gray-300)" />
                  <span style={{ fontSize: 11, color: "var(--gray-400)", fontWeight: 500 }}>{n.time}</span>
                  <span style={{ 
                    fontSize: 10, padding: "2px 8px", 
                    background: n.type === "Alert" ? "#fee2e2" : "var(--green-50)", 
                    color: n.type === "Alert" ? "#dc2626" : "var(--green-700)", 
                    borderRadius: 99, fontWeight: 700, marginLeft: "auto" 
                  }}>{n.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ 
          padding: 16, borderTop: "1px solid var(--gray-50)", textAlign: "center",
          background: "linear-gradient(180deg, white 0%, var(--gray-50) 100%)"
        }}>
          <button style={{ 
            fontSize: 13, fontWeight: 800, color: "var(--green-600)",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--green-700)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--green-600)"}
          >View All Notifications →</button>
        </div>
      </div>
    </>
  );
}

export default function TopBar() {
  const [isNotifOpen, setNotifOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";
      const h12 = hours % 12 || 12;
      setCurrentTime(`${h12.toString().padStart(2, "0")}:${mins} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 100, right: 0, height: 80,
      background: "rgba(249,250,251,0.75)", backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 30px", borderBottom: "1px solid rgba(0,0,0,0.04)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
         <div style={{ 
           width: 42, height: 42, 
           background: "linear-gradient(135deg, var(--green-500), var(--green-600))", 
           borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "white",
           boxShadow: "0 4px 14px rgba(34,197,94,0.25)",
           transition: "all 0.3s ease",
         }}
         onMouseEnter={e => e.currentTarget.style.transform = "rotate(12deg) scale(1.05)"}
         onMouseLeave={e => e.currentTarget.style.transform = "rotate(0deg) scale(1)"}
         >
           <Sprout size={22} strokeWidth={2.5} />
         </div>
         <div>
           <h1 style={{ fontSize: 18, fontWeight: 800, color: "var(--gray-900)", letterSpacing: "-0.03em", lineHeight: 1.2 }}>Greenhouse Monitor</h1>
           <p style={{ fontSize: 11, color: "var(--gray-400)", fontWeight: 500 }}>Smart Agriculture Dashboard</p>
         </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          position: "relative", width: searchFocused ? 280 : 200,
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
        }}>
          <Search size={16} color={searchFocused ? "var(--green-500)" : "var(--gray-400)"} style={{ 
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", 
            transition: "all 0.3s" 
          }} />
          <input
            placeholder="Search analytics..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              width: "100%", height: 42, padding: "0 14px 0 42px",
              borderRadius: 14, background: searchFocused ? "white" : "var(--gray-50)",
              fontSize: 13, color: "var(--gray-800)", fontWeight: 600,
              border: "1.5px solid",
              borderColor: searchFocused ? "var(--green-400)" : "transparent",
              transition: "all 0.3s",
              boxShadow: searchFocused ? "0 4px 20px rgba(34,197,94,0.1)" : "none"
            }}
          />
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
          background: "var(--gray-50)", borderRadius: 14,
          color: "var(--gray-500)", fontSize: 13, fontWeight: 600,
          border: "1px solid var(--gray-100)",
        }}>
          <Clock size={14} /> {currentTime}
        </div>

        <button style={{
          width: 42, height: 42, borderRadius: 14, background: "var(--white)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-400)",
          transition: "all 0.25s", border: "1px solid var(--gray-100)"
        }}
        onMouseEnter={e => { 
          e.currentTarget.style.background = "var(--gray-50)"; 
          e.currentTarget.style.color = "var(--gray-600)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={e => { 
          e.currentTarget.style.background = "white"; 
          e.currentTarget.style.color = "var(--gray-400)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        >
          <ExternalLink size={17} />
        </button>

        <button
          onClick={() => setNotifOpen(!isNotifOpen)}
          style={{
            height: 42, padding: "0 16px", borderRadius: 14,
            background: isNotifOpen ? "var(--green-50)" : "var(--gray-50)", 
            display: "flex", alignItems: "center", gap: 8,
            transition: "all 0.25s", position: "relative",
            border: isNotifOpen ? "1px solid var(--green-200)" : "1px solid var(--gray-100)",
          }}
          onMouseEnter={e => { 
            if(!isNotifOpen) {
              e.currentTarget.style.background = "var(--gray-100)"; 
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={e => { 
            if(!isNotifOpen) {
              e.currentTarget.style.background = "var(--gray-50)"; 
              e.currentTarget.style.transform = "translateY(0)";
            }
          }}
        >
          <Bell size={17} color={isNotifOpen ? "var(--green-600)" : "var(--gray-500)"} />
          <span style={{ fontSize: 13, fontWeight: 700, color: isNotifOpen ? "var(--green-700)" : "var(--gray-700)" }}>Alerts</span>
          <div style={{
            position: "absolute", top: 2, right: 2, width: 16, height: 16,
            background: "#ef4444", borderRadius: "50%", border: "2px solid white",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 8, color: "white", fontWeight: 900,
            animation: "pulse 2s infinite",
          }}>3</div>
        </button>

        <NotificationPanel isOpen={isNotifOpen} onToggle={() => setNotifOpen(false)} />
      </div>
    </header>
  );
}
