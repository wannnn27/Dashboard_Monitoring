// lib/data.js
const __today = new Date();
const __tomorrow = new Date();
__tomorrow.setDate(__tomorrow.getDate() + 1);
const __idMonths = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const __fmtToday = `${__today.getDate()} ${__idMonths[__today.getMonth()]} ${__today.getFullYear()}`;
const __fmtTomorrow = `${__tomorrow.getDate()} ${__idMonths[__tomorrow.getMonth()]}, ${__tomorrow.getFullYear()}`;

export const NAV_ITEMS = [
  { key: "overview",    label: "Ikhtisar",      icon: "Home" },
  { key: "tasks",       label: "Tugas",         icon: "ClipboardCheck" },
  { key: "crops",       label: "Hasil Panen",   icon: "Sprout" },
  { key: "devices",     label: "Perangkat",      icon: "Cpu" },
  { key: "activity",    label: "Aktivitas",      icon: "Zap" },
  { key: "surveillance",label: "Pengawasan",    icon: "Video" },
];

export const PAGE_CONFIG = {
  overview:     { title: "Pemantauan Rumah Kaca", subtitle: "Pemantauan dan manajemen waktu nyata" },
  tasks:        { title: "Manajemen Tugas",       subtitle: "Ikhtisar · Pantau dan kelola semua tugas pertanian" },
  crops:        { title: "Total Hasil Panen",     subtitle: "Total hasil dari semua lahan aktif" },
  devices:      { title: "Pertanian Pintar",      subtitle: "Manajemen perangkat pertanian cerdas" },
  activity:     { title: "Ikhtisar Lahan",        subtitle: "Wawasan dan analitik bertenaga AI" },
  surveillance: { title: "Peta Pengawasan",       subtitle: "Cakupan kamera dan pemantauan langsung" },
  settings:     { title: "Pengaturan Sistem",      subtitle: "Manajemen data pengguna dan konfigurasi kontrol" },
};

export const ALERTS = [
  { title: "Kesehatan Tanaman", desc: "Memantau vitalitas dan pertumbuhan tanaman.", ok: true  },
  { title: "Kelembapan Tanah",  desc: "Melacak tingkat air dalam tanah.",           ok: true  },
  { title: "pH Rendah",         desc: "Tanah asam membatasi penyerapan nutrisi.",    ok: false },
];

export const SENSORS = [
  { label: "Angin",        value: "15",  unit: "m/s", icon: "Wind" },
  { label: "Suhu",         value: "19",  unit: "°C",  desc: "Menampilkan suhu saat ini untuk keputusan penanaman.", icon: "Thermometer" },
  { label: "Kelembapan",   value: "65",  unit: "%",   desc: "Tingkat kelembapan udara di sekitar tanaman.", icon: "Droplets" },
];

export const SCHEDULE_ITEMS = [
  { time: "09:00 – 10:00", label: "Penyesuaian penyiraman" },
  { time: "09:00 – 11:00", label: "Penyesuaian penyiraman" },
];

export const TASKS = {
  "Harus Dikerjakan": [
    { title: "Aerasi Tanah",     desc: "Aerasi tanaman dengan hati-hati tanpa merusak akar", time: "02:00 – 03:00 PM", due: __fmtTomorrow },
    { title: "Pembaruan Mulsa",  desc: "Buang mulsa lama, tambahkan lapisan segar ke tanah",  time: "03:00 – 03:30 PM", due: __fmtTomorrow },
  ],
  "Sedang Berjalan": [
    { title: "Inspeksi Saluran Tetes", desc: "Periksa saluran tetes dari kebocoran dan penyumbatan", time: "02:00 – 03:00 PM", due: __fmtTomorrow, pct: 40 },
    { title: "Pencampuran Nutrisi",     desc: "Siapkan larutan nutrisi untuk tempat tanam",         time: "02:00 – 03:00 PM", due: __fmtTomorrow, pct: 60 },
  ],
  "Dalam Peninjauan": [
    { title: "Kalibrasi Sensor Iklim", desc: "Kalibrasi sensor suhu dan kelembapan secara akurat.", time: "02:00 – 03:00 PM", due: __fmtTomorrow, pct: 92 },
  ],
};

export const TASK_STATS = [
  { label: "Ikhtisar Tugas",    value: 6, sub: "Total tugas dijadwalkan hari ini" },
  { label: "Tugas Selesai",     value: 3, sub: "Tugas yang berhasil diselesaikan" },
  { label: "Sedang Berjalan",    value: 2, sub: "Tugas yang sedang dilakukan sekarang" },
];

export const MONTH_DATA = [
  { m: "Jan", v: 60 }, { m: "Feb", v: 55 }, { m: "Mar", v: 70 }, { m: "Apr", v: 65 },
  { m: "Mei", v: 85 }, { m: "Jun", v: 100 }, { m: "Jul", v: 75 }, { m: "Agu", v: 80 },
];

export const CONTAINERS = [
  { id: "#01", name: "Monstera Deliciosa", pct: 54, temp: 75, hum: 70 },
  { id: "#02", name: "Fiddle Leaf Fig",    pct: 60, temp: 80, hum: 65 },
  { id: "#03", name: "Snake Plant",        pct: 10, temp: 90, hum: 80 },
  { id: "#04", name: "Peace Lily",         pct: 77, temp: 60, hum: 55 },
];

export const RECENT_UPDATES = [
  { label: "Hasil panen meningkat 7%",   badge: "Panen",       badgeClass: "badge-green",  time: "Baru saja" },
  { label: "Tingkat irigasi disesuaikan", badge: "Penyiraman",   badgeClass: "badge-blue",   time: __fmtToday },
  { label: "Cahaya dioptimalkan",        badge: "Lingkungan",  badgeClass: "badge-yellow", time: __fmtToday },
];

export const DEVICES = [
  { name: "Sensor Tanah 01",            status: "Aktif", signal: "Baik", battery: "Cadangan Aktif",  updated: "3 menit yang lalu" },
  { name: "Sensor Cuaca 01",            status: "Aktif", signal: "Baik", battery: "Tenaga Surya",   updated: "5 menit yang lalu" },
  { name: "Kontroler Irigasi 01",       status: "Aktif", signal: "Baik", battery: "Daya Utama",      updated: "2 menit yang lalu" },
  { name: "Kamera 01",                 status: "Aktif", signal: "Lemah", battery: "Cadangan Aktif",  updated: "1 menit yang lalu"  },
];

export const CAMERAS = [
  { name: "Rumah Kaca Organik", region: "Bogor, Indonesia", size: "1028 m²", code: "CCTV-ENT-01" },
  { name: "Pintu Masuk Layanan", region: "Bogor, Indonesia", size: "880 m²",  code: "CCTV-SRV-02" },
  { name: "Dermaga Pemuatan",    region: "Bogor, Indonesia", size: "1100 m²", code: "CCTV-LDG-03" },
  { name: "Area Parkir",        region: "Bogor, Indonesia", size: "2220 m²", code: "CCTV-PKG-04" },
  { name: "Akses Atap",         region: "Bogor, Indonesia", size: "640 m²",  code: "CCTV-RF-05"  },
];

export const NOTIFICATIONS = [
  { initials: "AM", color: "#a78bfa", name: "Amina",  action: "membagikan file di",               target: "Operasi Lapangan",  time: "2 jam yang lalu", type: "Tugas", file: "Hasil_Padi_Maret.csv" },
  { initials: "JS", color: "#fbbf24", name: "Jassan", action: "menandai risiko cuaca di",         target: "Peringatan Iklim",  time: "2 jam yang lalu", type: "Peringatan" },
  { initials: "FR", color: "#60a5fa", name: "Farhan", action: "menjadwalkan panen di",             target: "Perencanaan Panen", time: "3 jam yang lalu", type: "Tugas" },
  { initials: "SN", color: "#34d399", name: "San",    action: "mencatat hasil inspeksi hama di",   target: "Kesehatan Tanaman", time: "3 jam yang lalu", type: "Tugas" },
];
