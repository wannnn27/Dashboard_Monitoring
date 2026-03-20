// App.jsx
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar  from "./components/TopBar";
import OverviewPage     from "./pages/OverviewPage";
import TasksPage        from "./pages/TasksPage";
import CropYieldPage    from "./pages/CropYieldPage";
import DevicesPage      from "./pages/DevicesPage";
import ActivityPage     from "./pages/ActivityPage";
import SurveillancePage from "./pages/SurveillancePage";
import { PAGE_CONFIG } from "./lib/data";

const PAGES = {
  overview:     <OverviewPage />,
  tasks:        <TasksPage />,
  crops:        <CropYieldPage />,
  devices:      <DevicesPage />,
  activity:     <ActivityPage />,
  surveillance: <SurveillancePage />,
};

export default function App() {
  const [page, setPage] = useState("overview");
  const { title } = PAGE_CONFIG[page];

  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "linear-gradient(180deg, #f8faf9 0%, #f3f4f6 100%)" 
    }}>
      <Sidebar active={page} setActive={setPage} />

      <div style={{ 
        marginLeft: 100, flex: 1, display: "flex", flexDirection: "column", 
        minHeight: "100vh", paddingRight: 28 
      }}>
        <TopBar title={title} />
        <main 
          key={page} 
          className="page-transition" 
          style={{ 
            marginTop: 90,
            paddingBottom: 40,
            flex: 1
          }}
        >
          {PAGES[page]}
        </main>
      </div>
    </div>
  );
}
