// lib/data.js

export const NAV_ITEMS = [
  { key: "overview",    label: "Overview",     icon: "Home" },
  { key: "tasks",       label: "Tasks",        icon: "ClipboardCheck" },
  { key: "crops",       label: "Crop Yield",   icon: "Sprout" },
  { key: "devices",     label: "Devices",      icon: "Cpu" },
  { key: "activity",    label: "Activity",     icon: "Zap" },
  { key: "surveillance",label: "Surveillance", icon: "Video" },
];

export const PAGE_CONFIG = {
  overview:     { title: "Greenhouse Monitoring", subtitle: "Real-time monitoring and management" },
  tasks:        { title: "Task Management",       subtitle: "Overview · Track and manage all farm tasks" },
  crops:        { title: "Total Crop Yield",      subtitle: "Total yield from all active fields" },
  devices:      { title: "Smart Farming",         subtitle: "Intelligent agriculture device management" },
  activity:     { title: "Farm Overview",         subtitle: "AI-powered insights and analytics" },
  surveillance: { title: "Surveillance Map",      subtitle: "Camera coverage and live monitoring" },
};

export const ALERTS = [
  { title: "Plant Health",  desc: "Monitors crop vitality and growth.", ok: true  },
  { title: "Soil Moisture", desc: "Tracks water levels in soil.",       ok: true  },
  { title: "Low pH",        desc: "Acidic soil limits nutrients.",       ok: false },
];

export const SENSORS = [
  { label: "Wind",        value: "15",  unit: "m/s", icon: "Wind" },
  { label: "Temperature", value: "19",  unit: "°C",  desc: "Shows current temperature for planting decisions.", icon: "Thermometer" },
  { label: "Temperature", value: "19",  unit: "°C",  desc: "Shows current temperature for planting decisions.", icon: "Thermometer" },
];

export const SCHEDULE_ITEMS = [
  { time: "09:00 – 10:00", label: "Watering adjustment" },
  { time: "09:00 – 11:00", label: "Watering adjustment" },
];

export const TASKS = {
  "To Do": [
    { title: "Soil Aeration",   desc: "Carefully aerate plants without damaging roots", time: "02:00 – 03:00 PM", due: "Sep 10, 2024" },
    { title: "Mulch Renewal",   desc: "Remove old mulch, add fresh layer to soil",      time: "03:00 – 03:30 PM", due: "Sep 10, 2024" },
  ],
  "In Progress": [
    { title: "Drip Line Inspection", desc: "Check drip lines for leaks and blockages", time: "02:00 – 03:00 PM", due: "Sep 10, 2024", pct: 40 },
    { title: "Nutrient Mixing",      desc: "Prepare nutrient solution for planting beds", time: "02:00 – 03:00 PM", due: "Sep 10, 2024", pct: 60 },
  ],
  "In Review": [
    { title: "Climate Sensor Calibration", desc: "Calibrate temperature and humidity sensors accurately.", time: "02:00 – 03:00 PM", due: "Sep 10, 2024", pct: 92 },
  ],
};

export const TASK_STATS = [
  { label: "Task Overview",    value: 6, sub: "Total tasks scheduled for today" },
  { label: "Completed Tasks",  value: 3, sub: "Tasks completed successfully so far" },
  { label: "In Progress",      value: 2, sub: "Tasks currently in progress now" },
];

export const MONTH_DATA = [
  { m: "Jan", v: 60 }, { m: "Feb", v: 55 }, { m: "Mar", v: 70 }, { m: "Apr", v: 65 },
  { m: "May", v: 85 }, { m: "Jun", v: 100 }, { m: "Jul", v: 75 }, { m: "Aug", v: 80 },
];

export const CONTAINERS = [
  { id: "#01", name: "Monstera Deliciosa", pct: 54, temp: 75, hum: 70 },
  { id: "#02", name: "Fiddle Leaf Fig",    pct: 60, temp: 80, hum: 65 },
  { id: "#03", name: "Snake Plant",        pct: 10, temp: 90, hum: 80 },
  { id: "#04", name: "Peace Lily",         pct: 77, temp: 60, hum: 55 },
];

export const RECENT_UPDATES = [
  { label: "Yield increased by 7%",      badge: "Harvest",     badgeClass: "badge-green",  time: "Now" },
  { label: "Irrigation level adjusted",  badge: "Watering",    badgeClass: "badge-blue",   time: "May 9, 2024" },
  { label: "Light exposure optimized",   badge: "Environment", badgeClass: "badge-yellow", time: "May 9, 2024" },
];

export const DEVICES = [
  { name: "Soil Sensor 01",            status: "Active", signal: "Good", battery: "Backup Enabled",  updated: "3 minutes ago" },
  { name: "Weather Sensor 01",         status: "Active", signal: "Good", battery: "Solar Powered",   updated: "5 minutes ago" },
  { name: "Irrigation Controller 01",  status: "Active", signal: "Good", battery: "Main Power",      updated: "2 minutes ago" },
  { name: "Camera 01",                 status: "Active", signal: "Weak", battery: "Backup Enabled",  updated: "1 minute ago"  },
];

export const CAMERAS = [
  { name: "Organic Greenhouse", region: "Weilburg, Germany", size: "1028 m²", code: "CCTV-ENT-01" },
  { name: "Service Entrance",   region: "Weilburg, Germany", size: "880 m²",  code: "CCTV-SRV-02" },
  { name: "Loading Dock",       region: "Weilburg, Germany", size: "1100 m²", code: "CCTV-LDG-03" },
  { name: "Parking Lot",        region: "Weilburg, Germany", size: "2220 m²", code: "CCTV-PKG-04" },
  { name: "Roof Access",        region: "Weilburg, Germany", size: "640 m²",  code: "CCTV-RF-05"  },
];

export const NOTIFICATIONS = [
  { initials: "AM", color: "#a78bfa", name: "Amina",  action: "shared a file in",                 target: "Field Operations",  time: "2 hours ago", type: "Task",  file: "Rice_Yield_March.csv" },
  { initials: "JS", color: "#fbbf24", name: "Jassan", action: "flagged weather risk in",           target: "Climate Alerts",    time: "2 hours ago", type: "Alert" },
  { initials: "FR", color: "#60a5fa", name: "Farhan", action: "scheduled harvest activity in",     target: "Harvest Planning",  time: "3 hours ago", type: "Task" },
  { initials: "SN", color: "#34d399", name: "San",    action: "logged pest inspection results in", target: "Crop Health",       time: "3 hours ago", type: "Task" },
];
