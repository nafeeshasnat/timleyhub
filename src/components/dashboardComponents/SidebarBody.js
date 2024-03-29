import { Route, Routes } from "react-router-dom";
import NewProject from "./NewProject";
import AllProjects from "./AllProjects";
import MainTracker from "./HourTracker/MainTracker";
import AllColleborators from "./Colleborators/AllColleborators";

const SidebarBody = () => {
  return(
    <>
        <Routes>
          <Route path="new-project" element={<NewProject />} />
          <Route path="all-projects" element={<AllProjects />} />
          <Route path="time-tracker" element={<MainTracker />} />
          <Route path="colleborators" element={<AllColleborators/>} />
        </Routes>
    </>
  )
}

export default SidebarBody;