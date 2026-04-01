import { useState } from "react";
import { Card, Button, Badge } from "../components/ui";
import { Map, Leaf, Pencil, Trash2, Save, X, Plus, Settings } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("zones");
  
  // CRUD State for Farm Zones
  const [zones, setZones] = useState([
    { id: 1, name: "Zona A (Utama)", plant: "Tomat Ceri", temp: "22-26°C", hum: "65-75%", area: "120 m²", status: "Aktif" },
    { id: 2, name: "Zona B (Barat)", plant: "Selada Air", temp: "18-22°C", hum: "70-85%", area: "80 m²", status: "Aktif" },
    { id: 3, name: "Zona Pembibitan", plant: "Bibit Cabai", temp: "25-28°C", hum: "80-90%", area: "45 m²", status: "Pemeliharaan" }
  ]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ name: "", plant: "", temp: "", hum: "", area: "", status: "Aktif" });
  
  const handleOpenForm = (item = null) => {
    if (item) {
      setFormData(item);
      setEditingId(item.id);
    } else {
      setFormData({ name: "", plant: "", temp: "", hum: "", area: "", status: "Aktif" });
      setEditingId(null);
    }
    setIsFormOpen(true);
  };
  
  const handleSave = () => {
    if (!formData.name || !formData.plant) return alert("Peringatan: Nama Zona dan Jenis Tanaman wajib diisi!");
    
    if (editingId) {
      setZones(zones.map(z => z.id === editingId ? { ...formData, id: editingId } : z));
    } else {
      setZones([...zones, { ...formData, id: Date.now() }]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm("Apakah Anda yakin ingin menghapus konfigurasi zona ini?")) {
      setZones(zones.filter(z => z.id !== id));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "fadeIn 0.5s ease" }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 12 }}>
        <Button variant={activeTab === "zones" ? "primary" : "outline"} onClick={() => setActiveTab("zones")}>
          <Map size={16} /> Manajemen Lahan Tanam
        </Button>
        <Button variant={activeTab === "general" ? "primary" : "outline"} onClick={() => setActiveTab("general")}>
          <Settings size={16} /> Konfigurasi IoT
        </Button>
      </div>

      {activeTab === "zones" && (
        <Card style={{ padding: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--gray-900)", letterSpacing: "-0.02em" }}>Konfigurasi Zona Lahan</h2>
              <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 4, fontWeight: 500 }}>Kelola parameter lingkungan ideal untuk setiap area tanam</p>
            </div>
            {!isFormOpen && (
              <Button variant="primary" onClick={() => handleOpenForm()}>
                <Plus size={16} /> Tambah Zona Baru
              </Button>
            )}
          </div>

          {isFormOpen ? (
            <div style={{ background: "var(--green-50)", padding: 24, borderRadius: 16, border: "1px solid var(--green-200)", animation: "slideUpFade 0.3s ease" }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20, color: "var(--green-800)" }}>{editingId ? "Edit Zona Tanam" : "Buat Zona Tanam Baru"}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px", marginBottom: 24 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--gray-600)", marginBottom: 8 }}>Nama Zona Lahan <span style={{color: "var(--green-600)"}}>*</span></label>
                  <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--gray-200)", background: "white", fontSize: 13, fontWeight: 600, color: "var(--gray-800)" }} placeholder="Contoh: Zona C (Selatan)" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--gray-600)", marginBottom: 8 }}>Jenis Tanaman <span style={{color: "var(--green-600)"}}>*</span></label>
                  <input value={formData.plant} onChange={e => setFormData({...formData, plant: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--gray-200)", background: "white", fontSize: 13, fontWeight: 600, color: "var(--gray-800)" }} placeholder="Contoh: Bayam Hidroponik" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--gray-600)", marginBottom: 8 }}>Target Suhu</label>
                  <input value={formData.temp} onChange={e => setFormData({...formData, temp: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--gray-200)", background: "white", fontSize: 13, fontWeight: 600, color: "var(--gray-800)" }} placeholder="Contoh: 20-25°C" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--gray-600)", marginBottom: 8 }}>Target Kelembapan</label>
                  <input value={formData.hum} onChange={e => setFormData({...formData, hum: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--gray-200)", background: "white", fontSize: 13, fontWeight: 600, color: "var(--gray-800)" }} placeholder="Contoh: 60-70%" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--gray-600)", marginBottom: 8 }}>Luas Area</label>
                  <input value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--gray-200)", background: "white", fontSize: 13, fontWeight: 600, color: "var(--gray-800)" }} placeholder="Contoh: 100 m²" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--gray-600)", marginBottom: 8 }}>Status Modul Iklim</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--gray-200)", background: "white", fontSize: 13, fontWeight: 700, color: "var(--gray-800)", cursor: "pointer" }}>
                    <option value="Aktif">Sensor Aktif</option>
                    <option value="Pemeliharaan">Dalam Pemeliharaan</option>
                    <option value="Nonaktif">Sensor Nonaktif</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <Button variant="outline" onClick={() => setIsFormOpen(false)}><X size={16} /> Batal</Button>
                <Button variant="primary" onClick={handleSave}><Save size={16} /> {editingId ? "Simpan Perubahan" : "Simpan Zona Baru"}</Button>
              </div>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1.5px solid var(--gray-200)", textAlign: "left", color: "var(--gray-400)", fontWeight: 800 }}>
                    <th style={{ padding: "0 16px 16px" }}>Area Lahan</th>
                    <th style={{ padding: "0 16px 16px" }}>Tanaman</th>
                    <th style={{ padding: "0 16px 16px" }}>Suhu & Lembap</th>
                    <th style={{ padding: "0 16px 16px" }}>Luas</th>
                    <th style={{ padding: "0 16px 16px" }}>Status IoT</th>
                    <th style={{ padding: "0 16px 16px", textAlign: "right" }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {zones.length === 0 ? (
                    <tr><td colSpan={6} style={{ padding: 40, textAlign: "center", color: "var(--gray-400)", fontWeight: 600 }}>Belum ada zona lahan yang didata.</td></tr>
                  ) : zones.map((z) => (
                    <tr key={z.id} style={{ borderBottom: "1px solid var(--gray-100)", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "var(--gray-50)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "16px", fontWeight: 800, color: "var(--gray-900)" }}>{z.name}</td>
                      <td style={{ padding: "16px", color: "var(--green-700)", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                        <Leaf size={14} /> {z.plant}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--gray-600)" }}>🌡 {z.temp}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--gray-400)", marginTop: 4 }}>💧 {z.hum}</div>
                      </td>
                      <td style={{ padding: "16px", color: "var(--gray-600)", fontWeight: 600 }}>{z.area}</td>
                      <td style={{ padding: "16px" }}>
                        <Badge label={z.status} variant={z.status.includes("Aktif") ? "green" : z.status.includes("Pemeliharaan") ? "yellow" : "red"} />
                      </td>
                      <td style={{ padding: "16px", textAlign: "right" }}>
                        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                          <button 
                            onClick={() => handleOpenForm(z)} 
                            style={{ cursor: "pointer", padding: "8px 10px", borderRadius: 10, color: "var(--gray-500)", background: "var(--gray-100)", transition: "all 0.2s", border: "none" }}
                            onMouseEnter={e => { e.currentTarget.style.background = "var(--green-100)"; e.currentTarget.style.color = "var(--green-700)" }}
                            onMouseLeave={e => { e.currentTarget.style.background = "var(--gray-100)"; e.currentTarget.style.color = "var(--gray-500)" }}
                          ><Pencil size={15} strokeWidth={2.5} /></button>
                          
                          <button 
                            onClick={() => handleDelete(z.id)} 
                            style={{ cursor: "pointer", padding: "8px 10px", borderRadius: 10, color: "#ef4444", background: "#fee2e2", transition: "all 0.2s", border: "none" }}
                            onMouseEnter={e => { e.currentTarget.style.background = "#ef4444"; e.currentTarget.style.color = "white" }}
                            onMouseLeave={e => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444" }}
                          ><Trash2 size={15} strokeWidth={2.5} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {activeTab === "general" && (
        <Card style={{ padding: "30px 40px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--gray-900)", marginBottom: 12, letterSpacing: "-0.01em" }}>Kalibrasi Preferensi IoT</h2>
          <p style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 24, lineHeight: 1.6 }}>Atur frekuensi sinkronisasi data sensor secara global, atur batas kebocoran jaringan air, dan hubungkan node cuaca eksternal. Mode pengembangan aktif.</p>
          <div style={{ background: "var(--gray-50)", padding: 30, borderRadius: 16, border: "2px dashed var(--gray-200)", color: "var(--gray-400)", fontSize: 13, fontWeight: 700, textAlign: "center" }}>
            <Settings size={24} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
            Antarmuka kalibrasi perangkat keras (Global) sedang dalam tahap pembuatan modul.
          </div>
        </Card>
      )}

    </div>
  );
}
