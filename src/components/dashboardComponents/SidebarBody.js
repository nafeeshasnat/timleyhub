import { Route, Routes, Navigate } from "react-router-dom";
import NewProject from "./NewProject";
import AllProjects from "./AllProjects";
import MainTracker from "./HourTracker/MainTracker";
import AllColleborators from "./Colleborators/AllColleborators";
import Settings from "./Settings";

const SidebarBody = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="time-tracker" />} />  // Redirect to MainTracker
      <Route path="new-project" element={<NewProject />} />
      <Route path="all-projects" element={<AllProjects />} />
      <Route path="time-tracker" element={<MainTracker />} />
      <Route path="colleborators" element={<AllColleborators/>} />
      <Route path="settings" element={<Settings/>} />
    </Routes>
  );
}

export default SidebarBody;
